package com.sm.server.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "orders_details")
public class OrderDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @OneToOne
    @JoinColumn(name = "product_id", referencedColumnName = "id")
    @NotBlank
    @NotNull
    private Product product;

    @Column(name = "quantity")
    @NotBlank
    @NotNull
    private int quantity;

    @Column(name = "price")
    @NotBlank
    @NotNull
    private Double price;

    @Column(name = "totalCash")
    private Double totalCash;


    @ManyToOne
    @JoinColumn(name = "order_id")
    @NotBlank
    private Order order;
}
