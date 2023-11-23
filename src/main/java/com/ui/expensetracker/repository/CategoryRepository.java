package com.ui.expensetracker.repository;

import java.util.List;

import com.ui.expensetracker.model.Category;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 * Interact with database and handles all operations for categories.
 *
 * @author dmitryilkevich
 */
@Repository
public interface CategoryRepository extends CrudRepository<Category, Long> {
    List<Category> findAll();
}
