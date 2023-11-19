package com.sm.server.entity;

import com.sm.server.core.entities.BaseEntity;
import com.sm.server.core.entities.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "orders")
public class Order extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "shipper_id", referencedColumnName = "id")
    @NotNull
    private User shipper;

    @OneToOne(fetch = FetchType.EAGER)
    @NotNull
    private Product product;

    @Column(name = "quantity")
    @NotNull
    private Integer quantity;

    @Column(name = "price")
    @NotNull
    private Double price;

    @Column(name = "total_cash")
    private Double totalCash;

    @Column
    private Integer status;

}
