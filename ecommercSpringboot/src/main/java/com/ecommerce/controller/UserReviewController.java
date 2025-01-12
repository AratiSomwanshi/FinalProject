package com.ecommerce.controller;

import com.ecommerce.model.Review;
import com.ecommerce.service.ReviewService;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin
@RestController
@RequestMapping("/api/user/reviews")
public class UserReviewController {

    private final ReviewService reviewService;

    public UserReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @PostMapping
    public Review createReview(@RequestBody Review review, @AuthenticationPrincipal UserDetails userDetails) {
        review.setUsername(userDetails.getUsername());
        return reviewService.addReview(review);
    }

    @DeleteMapping("/{id}")
    public void deleteReview(@PathVariable Long id, @AuthenticationPrincipal UserDetails userDetails) {
        Review review = reviewService.getReviewById(id);
        if (!review.getUsername().equals(userDetails.getUsername())) {
            throw new AccessDeniedException("You do not have permission to delete this review");
        }
        reviewService.deleteReview(id);
    }

    @GetMapping("/{productId}")
    public List<Review> getReviewsByProductId(@PathVariable Long productId) {
        return reviewService.getReviewsByProductId(productId);
    }

    @GetMapping
    public List<Review> getUserReviews(@AuthenticationPrincipal UserDetails userDetails) {
        return reviewService.getReviewsByUsername(userDetails.getUsername());
    }
}

