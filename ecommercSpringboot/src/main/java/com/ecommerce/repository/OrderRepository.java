package com.ecommerce.repository;

import com.ecommerce.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByEmail(String email);
    List<Order> findByStatus(String status); 
    List<Order> findByDatePlacedBetween(Date startDate, Date endDate); 
}
