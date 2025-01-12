package com.ecommerce.response;

public class CategoryResponse {
    
    private Long id;
    private String categoryName;
    private String message;

    // Constructor
    public CategoryResponse(Long id, String categoryName, String message) {
        this.id = id;
        this.categoryName = categoryName;
        this.message = message;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
