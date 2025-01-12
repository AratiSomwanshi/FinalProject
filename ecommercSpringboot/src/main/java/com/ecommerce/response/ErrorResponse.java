package com.ecommerce.response;

public class ErrorResponse {
    private String error;

    // Constructor that takes an error message as a parameter
    public ErrorResponse(String error) {
        this.error = error;
    }

    // Getter and Setter
    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }
}
