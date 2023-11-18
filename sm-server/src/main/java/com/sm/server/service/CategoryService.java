package com.sm.server.service;

import com.sm.server.common.CustomException;
import com.sm.server.entity.Category;
import com.sm.server.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {

    private final CategoryRepository repository;

    @Autowired
    public CategoryService(CategoryRepository repository) {
        this.repository = repository;
    }

    public void saveCategory(Category category) throws Exception {

        repository.save(category);
    }

    public void deleteCategory(Long id) throws Exception {

        Optional<Category> existedOrderOptional = repository.findById(id);

        if (!existedOrderOptional.isPresent()) {
            throw new CustomException("This category is not existed");
        }

        repository.deleteById(id);

    }

    public List<Category> getAllCategories() {

        return repository.findAll();
    }

    public Category getCategory(Long categoryId) {
        Optional<Category> categoryOptional = repository.findById(categoryId);

        if (categoryOptional.isPresent()) {
            return categoryOptional.get();
        }

        return null;
    }
}





























