package com.sm.server.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "categories")
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Column
    @NotNull
    private String name;

    @OneToMany(fetch = FetchType.EAGER)
    @JoinTable(
            joinColumns = @JoinColumn(name = "category_id"),
            inverseJoinColumns = @JoinColumn(name = "product_id")
    )
    private List<Product> products;


    @Column
    private String description;

    public Category(Long id, String name, String description) {
        this.id = id;
        this.name = name;
        this.description = description;
    }
}
