package com.ui.expensetracker.service;

import java.util.List;

import com.ui.expensetracker.model.Category;
import com.ui.expensetracker.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Contains business logic for Category business object manipulations.
 *
 * @author dmitryilkevich
 */
@Service
public class CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;

    /**
     * Retrieves all available categories
     *
     * @return List of categories
     */
    public List<Category> getCategories() {
        return categoryRepository.findAll();
    }

    /**
     * Creates new spend category
     *
     * @param category Category object
     * @return Created category object
     */
    public Category createCategory(Category category) {
        Category result = null;

        if (category != null && category.getId() == null && category.getName() != null && category.getDescription() != null) {
            result = categoryRepository.save(category);
        }

        return result;
    }

    /**
     * Delete category by id
     *
     * @param categoryId Category id to delete
     * @return true if category deleted
     */
    public boolean deleteCategory(Long categoryId) {
        boolean deletionResult = false;

        if (categoryId != null && categoryId > -1) {
            categoryRepository.deleteById(categoryId);
            deletionResult = true;
        }

        return deletionResult;
    }
}
