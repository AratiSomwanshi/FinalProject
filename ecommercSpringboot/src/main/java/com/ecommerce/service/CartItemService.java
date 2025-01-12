package com.ecommerce.service;

import com.ecommerce.exception.CartItemException;
import com.ecommerce.exception.UserException;
import com.ecommerce.model.Cart;
import com.ecommerce.model.CartItem;
import com.ecommerce.model.Product;
import com.ecommerce.model.User;
import com.ecommerce.repository.CartItemRepository;
import com.ecommerce.repository.CartRepository;
import org.springframework.stereotype.Service;

@Service
public class CartItemService {

    private final CartItemRepository cartItemRepository;
    private final UserService userService;

    public CartItemService(CartItemRepository cartItemRepository, CartRepository cartRepository,
                           UserService userService) {
        this.cartItemRepository = cartItemRepository;
        this.userService = userService;
    }

    public CartItem createCartItem(CartItem cartItem) {
        cartItem.setPrice(cartItem.getProduct().getPrice() * cartItem.getQuantity());
        return cartItemRepository.save(cartItem);
    }

    public CartItem updateCartItem(Long userId, Long id, CartItem cartItem) throws CartItemException, UserException {
        CartItem item = findCartItemById(id);
        User user = userService.getUserById(item.getCart().getUser().getId());

        if (user.getId().equals(userId)) {
            item.setQuantity(cartItem.getQuantity());
            item.setPrice(item.getQuantity() * item.getProduct().getPrice());
            return cartItemRepository.save(item);
        } else {
            throw new CartItemException("You can't update another user's cart item");
        }
    }

    public void removeCartItem(Long userId, Long cartItemId) throws CartItemException, UserException {
        CartItem cartItem = findCartItemById(cartItemId);
        User user = userService.getUserById(cartItem.getCart().getUser().getId());
        User reqUser = userService.getUserById(userId);

        if (user.getId().equals(reqUser.getId())) {
            cartItemRepository.deleteById(cartItem.getId());
        } else {
            throw new UserException("You can't remove another user's item");
        }
    }

    public CartItem findCartItemById(Long cartItemId) throws CartItemException {
        return cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new CartItemException("Cart item not found with id: " + cartItemId));
    }

    public CartItem findCartItemInCart(Cart cart, Product product) {
        return cart.getItems().stream()
                .filter(item -> item.getProduct().equals(product))
                .findFirst().orElse(null);
    }
}
