package com.sm.server.common;

import com.sm.server.core.repositories.RoleRepository;
import com.sm.server.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public void run(String... args) throws Exception {

        initializeRoles();
        initializeCategory();
    }

    private void initializeCategory() {


    }

    private void initializeRoles() {

    }
}