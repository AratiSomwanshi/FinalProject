package com.ecommerce.service;

import com.ecommerce.model.Payment;
import com.ecommerce.enums.PaymentStatus;
import com.ecommerce.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import jakarta.persistence.EntityNotFoundException;
import java.util.List;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    public List<Payment> findPaymentsByEmail(String email) {
      
        return paymentRepository.findAll();
    }

    public Payment getPaymentById(Long paymentId) {
        return paymentRepository.findById(paymentId)
                .orElseThrow(() -> new EntityNotFoundException("Payment not found with ID: " + paymentId));
    }

    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }

    public Payment updatePayment(Long id, Payment updatedPayment) {
        if (!paymentRepository.existsById(id)) {
            throw new EntityNotFoundException("Payment not found with ID: " + id);
        }
        updatedPayment.setId(id);
        return paymentRepository.save(updatedPayment);
    }

    public Payment updatePaymentStatus(Long id, PaymentStatus status) {
        Payment payment = getPaymentById(id);
        payment.setPaymentStatus(status);
        return paymentRepository.save(payment);
    }
}
