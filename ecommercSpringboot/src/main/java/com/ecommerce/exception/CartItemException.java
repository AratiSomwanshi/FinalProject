package com.ecommerce.exception;

public class CartItemException extends RuntimeException {

    public CartItemException(String message) {
        super(message);
    }

    public CartItemException(String message, Throwable cause) {
        super(message, cause);
    }
}
