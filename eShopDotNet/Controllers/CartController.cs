
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using eShopSystem.Models;
using Microsoft.EntityFrameworkCore;
using eShopSystem.Data;
using System.Text.Json;
using System.Linq;
using System.Threading.Tasks;
using System;

namespace eShopSystem.Controllers
{
    public class CartController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ApplicationDbContext _context;

        public CartController(UserManager<ApplicationUser> userManager, ApplicationDbContext context)
        {
            _userManager = userManager;
            _context = context;
        }

        // GET: Cart - Display Cart
        [Authorize(Roles = "User")]
        public async Task<IActionResult> Index()
        {
            var user = await _userManager.GetUserAsync(User);
            Cart cart = user != null ? await GetCartForUser(user.Id) : GetCartFromSession();
            ViewBag.CartItemCount = cart.TotalItems;

            return View(cart);
        }

        // Helper to get cart from session (for guest users)
        private Cart GetCartFromSession()
        {
            var cartJson = HttpContext.Session.GetString("Cart");
            return cartJson != null
                ? JsonSerializer.Deserialize<Cart>(cartJson)
                : new Cart { CartItems = new List<CartItem>(), TotalItems = 0, TotalPrice = 0 };
        }

        // Helper to store cart to session (for guest users)
        private void SetCartToSession(Cart cart)
        {
            var cartJson = JsonSerializer.Serialize(cart);
            HttpContext.Session.SetString("Cart", cartJson);
        }

        // POST: Cart/AddToCart - Add item to cart
        [HttpPost]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> AddToCart(int productId, int quantity)
        {
            var user = await _userManager.GetUserAsync(User);
            Cart cart = user != null ? await GetCartForUser(user.Id) : GetCartFromSession();
            var product = await _context.Products.FindAsync(productId);

            if (product != null)
            {
                var existingCartItem = cart.CartItems.FirstOrDefault(ci => ci.ProductId == productId);

                if (existingCartItem != null)
                {
                    existingCartItem.Quantity += quantity;
                }
                else
                {
                    cart.CartItems.Add(new CartItem
                    {
                        ProductId = productId,
                        Product = product,
                        Quantity = quantity,
                        Price = (double)(decimal)product.Price
                    });
                }

                UpdateCartTotals(cart);

                if (user != null)
                {
                    _context.Update(cart);
                    await _context.SaveChangesAsync();
                }
                else
                {
                    SetCartToSession(cart);
                }
            }

            return RedirectToAction("Index");
        }

        // Helper to update cart totals
        private void UpdateCartTotals(Cart cart)
        {
            cart.TotalItems = cart.CartItems.Sum(ci => ci.Quantity);
            cart.TotalPrice = cart.CartItems.Sum(ci => ci.Quantity * ci.Price);
        }

        // Helper to get the user's cart from the database
        private async Task<Cart> GetCartForUser(string userId)
        {
            var cart = await _context.Carts
                .Include(c => c.CartItems)
                .ThenInclude(ci => ci.Product)
                .FirstOrDefaultAsync(c => c.UserId == userId);

            if (cart == null)
            {
                cart = new Cart
                {
                    UserId = userId,
                    CartItems = new List<CartItem>(),
                    TotalItems = 0,
                    TotalPrice = 0
                };
                _context.Carts.Add(cart);
                await _context.SaveChangesAsync();
            }

            return cart;
        }

        // POST: Cart/RemoveFromCart - Remove item from cart
        [HttpPost]
        public async Task<IActionResult> RemoveFromCart(int cartItemId)
        {
            var user = await _userManager.GetUserAsync(User);
            Cart cart = user != null ? await GetCartForUser(user.Id) : GetCartFromSession();
            var cartItem = cart?.CartItems.FirstOrDefault(ci => ci.Id == cartItemId);

            if (cartItem != null)
            {
                cart.CartItems.Remove(cartItem);
                UpdateCartTotals(cart);

                if (user != null)
                {
                    _context.CartItems.Remove(cartItem);
                    _context.Update(cart);
                    await _context.SaveChangesAsync();
                }
                else
                {
                    SetCartToSession(cart);
                }
            }

            return RedirectToAction("Index");
        }

        // POST: Cart/UpdateQuantity - Update item quantity in the cart
        [HttpPost]
        public async Task<IActionResult> UpdateQuantity(int cartItemId, int quantity)
        {
            var user = await _userManager.GetUserAsync(User);
            Cart cart = user != null ? await GetCartForUser(user.Id) : GetCartFromSession();

            var cartItem = cart.CartItems.FirstOrDefault(ci => ci.Id == cartItemId);

            if (cartItem != null && quantity > 0)
            {
                cartItem.Quantity = quantity;
                UpdateCartTotals(cart);

                if (user != null)
                {
                    _context.Update(cart);
                    await _context.SaveChangesAsync();
                }
                else
                {
                    SetCartToSession(cart);
                }
            }

            return Json(new { success = true });
        }

        // POST: Cart/ProceedToCheckout - Proceed to checkout page
        [HttpPost]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> ProceedToCheckout()
        {
            var user = await _userManager.GetUserAsync(User);
            Cart cart = user != null ? await GetCartForUser(user.Id) : GetCartFromSession();

            if (!cart.CartItems.Any())
            {
                return RedirectToAction("Index");
            }

            return RedirectToAction("Checkout");
        }

        // GET: Cart/Checkout - Display checkout page
        [HttpGet]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> Checkout()
        {
            var user = await _userManager.GetUserAsync(User);
            var cart = user != null ? await GetCartForUser(user.Id) : GetCartFromSession();

            if (!cart.CartItems.Any())
            {
                return RedirectToAction("Index");
            }

            var defaultShippingAddress = await _context.ShippingAddes
                .Where(s => s.UserId == user.Id && s.IsDefault)
                .FirstOrDefaultAsync();

            var model = new CheckoutViewModel
            {
                Cart = cart,
                CartItems = cart.CartItems.ToList(),
                TotalPrice = cart.TotalPrice,
                ShippingAdds = await _context.ShippingAddes
                    .Where(s => s.UserId == user.Id)
                    .ToListAsync(),
                DefaultShippingAdd = defaultShippingAddress
            };

            return View(model);
        }

        // POST: Cart/CompleteCheckout - Complete the checkout process
        [HttpPost]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> CompleteCheckout(int shippingAddressId)
        {
            var user = await _userManager.GetUserAsync(User);
            var cart = await GetCartForUser(user.Id);

            if (cart.CartItems.Any())
            {
                ShippingAdd shippingAddress = null;

                if (shippingAddressId == 0) // If no address is provided, use default or a fixed address
                {
                    shippingAddress = new ShippingAdd
                    {
                        AddressLine1 = "123 Fixed Address",
                        City = "City",
                        State = "State",
                        PostalCode = "12345",
                        Country = "Country",
                        UserId = user.Id,
                        IsDefault = true // Assuming this is a default address
                    };
                }
                else
                {
                    shippingAddress = await _context.ShippingAddes.FindAsync(shippingAddressId);
                }

                if (shippingAddress != null)
                {
                    var order = new Order
                    {
                        UserId = user.Id,
                        ShippingAddId = shippingAddress.Id,
                        TotalPrice = (decimal)cart.TotalPrice,
                        CreatedDate = DateTime.Now,
                        Status = "Pending"
                    };

                    _context.Orders.Add(order);
                    await _context.SaveChangesAsync();

                    _context.Carts.Remove(cart);  // Remove the cart after completing the order
                    await _context.SaveChangesAsync();

                    return RedirectToAction("OrderConfirmation", new { orderId = order.Id });
                }
            }

            return RedirectToAction("Index");
        }

        // GET: OrderConfirmation - Display order confirmation after completing checkout
        public IActionResult OrderConfirmation(int orderId)
        {
            // Fetch the order details and display confirmation
            var order = _context.Orders.Include(o => o.ShippingAdd)
                                       .FirstOrDefault(o => o.Id == orderId);
            return View(order);
        }
    }
}
