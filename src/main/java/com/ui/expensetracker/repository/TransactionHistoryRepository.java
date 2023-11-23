package com.ui.expensetracker.repository;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

import com.ui.expensetracker.model.TransactionHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

/**
 * Handles all operations connected with transaction histories.
 *
 * @author dmitryilkevich
 */
@Repository
public interface TransactionHistoryRepository extends JpaRepository<TransactionHistory, Long> {

    /**
     * Retrieves all transaction histories.
     *
     * @return found transaction histories
     */
    List<TransactionHistory> findAll();

    /**
     * Retrieves all unique transaction dates.
     *
     * @return Unique transaction dates
     */
    @Query(value = "SELECT DISTINCT transaction_date from transaction_history", nativeQuery = true)
    List<Date> findAllDates();

    /**
     * @return All transaction dates for the specific date
     */
    List<TransactionHistory> getTransactionHistoriesByTransactionDate(LocalDate date);

    /**
     * @return Money spent for the specific year
     */
    @Query(value = "SELECT SUM(transaction_value) from transaction_history where transaction_date like ?", nativeQuery = true)
    Double findMoneySpendByYear(String year);

    /**
     * @return Money spent for the specific month of the year
     */
    @Query(value = "SELECT SUM(transaction_value) from transaction_history where transaction_date like ?", nativeQuery = true)
    Double findMoneySpendByMonth(String month);

    /**
     * @return Money spent for the specific date
     */
    @Query(value = "SELECT SUM(transaction_value) from transaction_history where transaction_date = ?", nativeQuery = true)
    Double findMoneySpendByDay(String date);
}
