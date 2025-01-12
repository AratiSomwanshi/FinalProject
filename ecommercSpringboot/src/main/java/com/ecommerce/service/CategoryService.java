package com.ecommerce.service;

import com.ecommerce.model.Category;
import com.ecommerce.repository.CategoryRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import jakarta.persistence.EntityNotFoundException;
import java.util.List;

@Service
public class CategoryService {

    private static final Logger logger = LoggerFactory.getLogger(CategoryService.class);

    private final CategoryRepository categoryRepository;

    @Autowired
    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Transactional
    public Category addCategory(String categoryName) {
        logger.info("Adding new category: {}", categoryName);
        Category category = new Category();
        category.setCategoryName(categoryName);
        return categoryRepository.save(category);
    }

    @Transactional
    public Category updateCategory(Category category) {
        if (!categoryRepository.existsById(category.getId())) {
            throw new EntityNotFoundException("Category not found with ID: " + category.getId());
        }
        logger.info("Updating category with ID: {}", category.getId());
        return categoryRepository.save(category);
    }

    @Transactional
    public void deleteCategory(Long categoryId) {
        if (!categoryRepository.existsById(categoryId)) {
            throw new EntityNotFoundException("Category not found with ID: " + categoryId);
        }
        logger.info("Deleting category with ID: {}", categoryId);
        categoryRepository.deleteById(categoryId);
    }

    public Category getCategoryById(Long categoryId) {
        logger.info("Retrieving category with ID: {}", categoryId);
        return categoryRepository.findById(categoryId)
                .orElseThrow(() -> new EntityNotFoundException("Category not found with ID: " + categoryId));
    }

    public List<Category> getAllCategories() {
        logger.info("Retrieving all categories");
        return categoryRepository.findAll();
    }
}
