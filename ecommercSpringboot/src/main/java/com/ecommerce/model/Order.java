package com.ecommerce.model;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import com.ecommerce.enums.OrderStatus;


import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity
@Table(name = "orders") 
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String email;
    public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}
	 @Temporal(TemporalType.DATE)
	    private Date datePlaced;
	@Enumerated(EnumType.STRING)
    private OrderStatus status;

    public Date getDatePlaced() {
		return datePlaced;
	}

	public void setDatePlaced(Date datePlaced) {
		this.datePlaced = datePlaced;
	}
	   @ManyToOne
	    @JoinColumn(name = "user_id", nullable = false)
	   
	    private User user;

	    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
	    private Set<OrderItem> orderItems = new HashSet<>();

	    @OneToOne(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
	    private Payment payment;
    @Column(name = "order_date")
    private Date orderDate;

    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public OrderStatus getStatus() {
        return status;
    }

    public void setStatus(OrderStatus status) {
        this.status = status;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Set<OrderItem> getOrderItems() {
        return orderItems;
    }

    public void setOrderItems(Set<OrderItem> orderItems) {
        this.orderItems = orderItems;
    }

    public Payment getPayment() {
        return payment;
    }

    public void setPayment(Payment payment) {
        this.payment = payment;
    }

    public Date getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(Date orderDate) {
        this.orderDate = orderDate;
    }
}
