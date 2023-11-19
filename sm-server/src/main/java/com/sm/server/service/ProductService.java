package com.sm.server.service;

import com.sm.server.entity.Product;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService implements GenericService<Product, Long> {

    @Override
    public Product save(Product product) {
        return null;
    }

    @Override
    public List<Product> getAll() {
        return null;
    }

    @Override
    public Product getByID(Long aLong) {
        return null;
    }

    @Override
    public void delete(Long aLong) {

    }
}
