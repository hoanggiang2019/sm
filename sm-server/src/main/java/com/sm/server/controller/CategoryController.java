package com.sm.server.controller;

import com.sm.server.entity.Category;
import com.sm.server.service.CategoryService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/category")
@Validated
@CrossOrigin()
public class CategoryController {

    private final CategoryService service;

    public CategoryController(CategoryService service) {
        this.service = service;
    }

    @PostMapping("/addCategory")
    public ResponseEntity<String> addCategory(@Valid @RequestBody Category category) throws Exception {

        service.saveCategory(category);

        return ResponseEntity.ok("Add category successfully");

    }

    @DeleteMapping("/deleteCategory/{id}")
    public ResponseEntity<String> deleteCategory(@PathVariable(name = "id") Long id) throws Exception {

        service.deleteCategory(id);

        return ResponseEntity.ok("Delete category successfully");

    }

    @GetMapping("/getAll")
    public ResponseEntity<List<Category>> getAllCategories() {

        List<Category> categories = service.getAllCategories();

        if (categories.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(categories);

    }

    @GetMapping("/getCategory/{categoryId}")
    public ResponseEntity<Category> getCategory(@PathVariable(name = "categoryId") Long categoryId) {

        Category category = service.getCategory(categoryId);

        if (category == null) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(category);

    }

}
