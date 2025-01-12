package com.ecommerce.controller;

import com.ecommerce.model.Payment;
import com.ecommerce.service.PaymentService;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin
@RestController
@RequestMapping("/api/user/payments")
public class UserPaymentController {

    private final PaymentService paymentService;

    public UserPaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @GetMapping
    public List<Payment> getUserPayments(@AuthenticationPrincipal UserDetails userDetails) {
        return paymentService.findPaymentsByEmail(userDetails.getUsername());
    }

    @GetMapping("/{id}")
    public Payment getPaymentById(@PathVariable Long id, @AuthenticationPrincipal UserDetails userDetails) {
        Payment payment = paymentService.getPaymentById(id);
        if (!payment.getOrder().getEmail().equals(userDetails.getUsername())) {
            throw new AccessDeniedException("You do not have permission to access this payment");
        }
        return payment;
    }
}


