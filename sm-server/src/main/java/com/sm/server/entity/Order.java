package com.sm.server.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.antlr.v4.runtime.misc.NotNull;

import java.sql.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "shipper_id", referencedColumnName = "id")
    @NotBlank
    @NotNull
    private User shipper;

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @NotBlank
    @NotNull
    @JoinTable(
            joinColumns = @JoinColumn(name = "order_id"),
            inverseJoinColumns = @JoinColumn(name = "orderdetail_id")
    )
    private List<OrderDetail> orderDetails;

    @Column
    private Integer status;

    @Column
    private Double totalCash;

    @Column(name = "created_time")
    @NotNull
    @NotBlank
    private Date createdTime;

}
