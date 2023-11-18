package com.sm.server.service;

import com.sm.server.common.CustomException;
import com.sm.server.common.GlobalExceptionHandler;
import com.sm.server.entity.Warehouse;
import com.sm.server.repository.WarehouseRepository;
import org.apache.logging.log4j.LogManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class WarehouseService {

    private static final org.apache.logging.log4j.Logger LOGGER = LogManager.getLogger(GlobalExceptionHandler.class);

    @Autowired
    WarehouseRepository repository;

    public void addProduct(Warehouse warehouse) {

        warehouse.setCreatedTime(LocalDateTime.now());
        warehouse.setUpdatedTime(LocalDateTime.now());

        repository.save(warehouse);
        LOGGER.info("Add " + warehouse);
    }

    public void deleteProduct(Long id) throws Exception {

        Optional<Warehouse> existingWarehouseOptional = repository.findById(id);

        if (!existingWarehouseOptional.isPresent()) {

            throw new CustomException("This prduct is not existed");
        }

        repository.deleteById(id);
    }

    public void updateProduct(Warehouse updatedWarehouse) throws Exception {

        Optional<Warehouse> existingWarehouseOptional = repository.findById(updatedWarehouse.getId());

        if (existingWarehouseOptional.isPresent()) {
            Warehouse existingWarehouse = existingWarehouseOptional.get();

            existingWarehouse.setQuantity(updatedWarehouse.getQuantity());
            existingWarehouse.setUpdatedTime(updatedWarehouse.getUpdatedTime());
            existingWarehouse.setProduct(updatedWarehouse.getProduct());

            repository.save(existingWarehouse);

        } else {

            throw new CustomException("This prduct is not existed");

        }
    }

    public void deleteAllProduct() {
        repository.deleteAll();
    }
}
