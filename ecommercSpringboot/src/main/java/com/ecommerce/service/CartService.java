package com.ecommerce.service;

import com.ecommerce.exception.CartItemException;
import com.ecommerce.exception.ProductException;
import com.ecommerce.exception.UserException;
import com.ecommerce.model.Cart;
import com.ecommerce.model.CartItem;
import com.ecommerce.model.Product;
import com.ecommerce.model.User;
import com.ecommerce.repository.CartRepository;
import com.ecommerce.request.AddItemRequest;
import org.springframework.stereotype.Service;

@Service
public class CartService {

    private final CartRepository cartRepository;
    private final CartItemService cartItemService;
    private final ProductService productService;

    public CartService(CartRepository cartRepository, CartItemService cartItemService,
                       ProductService productService) {
        this.cartRepository = cartRepository;
        this.cartItemService = cartItemService;
        this.productService = productService;
    }

    public Cart createCart(User user) {
        Cart cart = new Cart();
        cart.setUser(user);
        return cartRepository.save(cart);
    }

    public Cart findUserCart(Long userId) {
        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Cart not found for user with id: " + userId));
        
        // Calculate total price and items
        updateCartTotals(cart);
        
        return cartRepository.save(cart);
    }

    public Cart addCartItem(Long userId, AddItemRequest req) throws ProductException, CartItemException, UserException {
        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Cart not found for user with id: " + userId));
        Product product = productService.findProductById(req.getProductId());
        
        if (product == null) {
            throw new ProductException("Product not found with id: " + req.getProductId());
        }

        CartItem existingItem = cartItemService.findCartItemInCart(cart, product);
        
        if (existingItem == null) {
            CartItem newItem = new CartItem();
            newItem.setProduct(product);
            newItem.setCart(cart);
            newItem.setQuantity(req.getQuantity());
            newItem.setPrice(product.getPrice() * req.getQuantity());
            cartItemService.createCartItem(newItem);
            cart.getItems().add(newItem);
        } else {
            existingItem.setQuantity(existingItem.getQuantity() + req.getQuantity());
            existingItem.setPrice(existingItem.getProduct().getPrice() * existingItem.getQuantity());
            cartItemService.updateCartItem(userId, existingItem.getId(), existingItem);
        }
        
        // Update cart totals
        updateCartTotals(cart);
        
        return cart; // Return Cart, not CartItem
    }
    
    private void updateCartTotals(Cart cart) {
        double totalPrice = 0;
        int totalItems = 0;
        for (CartItem item : cart.getItems()) {
            totalPrice += item.getPrice();
            totalItems += item.getQuantity();
        }
        cart.setTotalPrice(totalPrice);
        cart.setTotalItems(totalItems);
    }
}
