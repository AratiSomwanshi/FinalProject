package com.ecommerce.request;

public class AuthResponse {
	  private String jwt;
    private boolean status;
    private String message;
    private String redirectUrl;

    public AuthResponse() {}

    public AuthResponse(String message, boolean status) {
        this.message = message;
        this.status = status;
    }

    // Getters and Setters
    public String getJwt() {
        return jwt;
    }

    public void setJwt(String jwt) {
        this.jwt = jwt;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getRedirectUrl() {
        return redirectUrl;
    }

    public void setRedirectUrl(String redirectUrl) {
        this.redirectUrl = redirectUrl;
    }

}
