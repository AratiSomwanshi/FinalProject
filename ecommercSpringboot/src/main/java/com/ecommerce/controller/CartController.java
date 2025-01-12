package com.ecommerce.controller;

import com.ecommerce.exception.CartItemException;
import com.ecommerce.exception.ProductException;
import com.ecommerce.exception.UnauthorizedException;
import com.ecommerce.exception.UserException;
import com.ecommerce.model.Cart;
import com.ecommerce.model.User;
import com.ecommerce.request.AddItemRequest;
import com.ecommerce.service.CartService;
import com.ecommerce.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api/user/cart")
public class CartController {

    private static final Logger logger = LoggerFactory.getLogger(CartController.class);

    private final CartService cartService;
    private final UserService userService;

    public CartController(CartService cartService, UserService userService) {
        this.cartService = cartService;
        this.userService = userService;
    }

    @GetMapping("/")
    public ResponseEntity<?> findUserCartHandler(@RequestHeader("Authorization") String jwt) {
        try {
            logger.debug("Processing GET request with JWT: {}", jwt);
            User user = userService.findUserProfileByJwt(jwt);
            Cart cart = cartService.findUserCart(user.getId());
            return new ResponseEntity<>(cart, HttpStatus.OK);
        } catch (UnauthorizedException e) {
            logger.error("UnauthorizedException: {}", e.getMessage(), e);
            return new ResponseEntity<>(new ErrorResponse("Invalid or expired token"), HttpStatus.UNAUTHORIZED);
        } catch (CartItemException e) {
            logger.error("CartItemException: {}", e.getMessage(), e);
            return new ResponseEntity<>(new ErrorResponse(e.getMessage()), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            logger.error("Unexpected error: {}", e.getMessage(), e);
            return new ResponseEntity<>(new ErrorResponse("An unexpected error occurred"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/add")
    public ResponseEntity<?> addItemToCart(@RequestBody AddItemRequest req,
                                            @RequestHeader("Authorization") String jwt) {
        try {
            logger.debug("Processing POST request with JWT: {}", jwt);
            User user = userService.findUserProfileByJwt(jwt);
            Cart cart = cartService.addCartItem(user.getId(), req);
            return new ResponseEntity<>(cart, HttpStatus.ACCEPTED);
        } catch (UnauthorizedException e) {
            logger.error("UnauthorizedException: {}", e.getMessage(), e);
            return new ResponseEntity<>(new ErrorResponse("Invalid or expired token"), HttpStatus.UNAUTHORIZED);
        } catch (UserException e) {
            logger.error("UserException: {}", e.getMessage(), e);
            return new ResponseEntity<>(new ErrorResponse(e.getMessage()), HttpStatus.UNAUTHORIZED);
        } catch (ProductException e) {
            logger.error("ProductException: {}", e.getMessage(), e);
            return new ResponseEntity<>(new ErrorResponse(e.getMessage()), HttpStatus.NOT_FOUND);
        } catch (CartItemException e) {
            logger.error("CartItemException: {}", e.getMessage(), e);
            return new ResponseEntity<>(new ErrorResponse(e.getMessage()), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            logger.error("Unexpected error: {}", e.getMessage(), e);
            return new ResponseEntity<>(new ErrorResponse("An unexpected error occurred"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private static class ErrorResponse {
        private final String message;

        public ErrorResponse(String message) {
            this.message = message;
        }

        public String getMessage() {
            return message;
        }
    }
}