package com.ui.expensetracker.controler;

import java.util.List;

import com.ui.expensetracker.model.Category;
import com.ui.expensetracker.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * Retrieves REST requests to manipulate with {@link Category} object
 *
 * @author dmitryilkevich
 */
@RestController
public class CategoryController {

    /**
     * Dependency injection of {@link CategoryService}
     */
    @Autowired
    private CategoryService categoryService;

    /**
     * Retrieves all available categories
     *
     * @return All categories retieved from database
     */
    @GetMapping("/category")
    public List<Category> getCategories() {
        return categoryService.getCategories();
    }

    /**
     * Creates new category mappings JSON object with {@link Category} object.
     *
     * @param category Mapped Category object
     * @return Created category
     */
    @PostMapping(path = "/category", consumes = "application/json")
    public Category createCategory(@RequestBody Category category) {
        return categoryService.createCategory(category);
    }

    /**
     * Removes {@link Category} by id
     *
     * @param categoryId Category id
     */
    @DeleteMapping("/category/{categoryId}")
    public void deleteCategory(@PathVariable Long categoryId) {
        categoryService.deleteCategory(categoryId);
    }
}
