using eShopSystem.Data;
using eShopSystem.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace eShopSystem.Controllers
{
    [Authorize]
    public class PaymentController : Controller
    {
        private readonly ApplicationDbContext _context;

        public PaymentController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: Payment/ProcessPayment
        [HttpGet]
        [Authorize(Roles = "User")]
        public IActionResult ProcessPayment(int orderId)
        {
            var order = _context.Orders
                .Include(o => o.OrderItems)
                .FirstOrDefault(o => o.Id == orderId);

            if (order == null || order.PaymentStatus != "Pending")
            {
                return NotFound();
            }

            // Display payment page to user
            return View(order);
        }

        // POST: Payment/CompletePayment
        [HttpPost]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> CompletePayment(int orderId, string paymentMethod)
        {
            var order = await _context.Orders
                .Include(o => o.OrderItems)
                .FirstOrDefaultAsync(o => o.Id == orderId);

            if (order == null || order.PaymentStatus != "Pending")
            {
                return NotFound();
            }

            order.PaymentStatus = "Completed";

            var payment = new Payment
            {
                OrderId = order.Id,
                PaymentMethod = paymentMethod,
                Amount = order.TotalPrice,
                PaymentDate = DateTime.Now,
                PaymentStatus = "Completed"
            };

            _context.Payments.Add(payment);
            await _context.SaveChangesAsync();

            return RedirectToAction("OrderConfirmation", "Order", new { orderId = order.Id });
        }
    }
}

