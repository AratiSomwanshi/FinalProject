package com.ecommerce.controller;

import com.ecommerce.model.Order;
import com.ecommerce.model.OrderItem;
import com.ecommerce.request.PlaceOrderRequest;
import com.ecommerce.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin
@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;
    @PreAuthorize("hasRole('USER')")
    @PostMapping("/place")
    public ResponseEntity<Order> placeOrder(@RequestBody PlaceOrderRequest placeOrderRequest) {
        // Call the service to place an order
        List<OrderItem> orderItems = placeOrderRequest.getOrderItems();
        Order order = orderService.placeOrder(
                placeOrderRequest.getEmail(),
                orderItems,
                placeOrderRequest.getUserId(),
                placeOrderRequest.getOrderDate()
        );
        return ResponseEntity.ok(order);
    }
}
