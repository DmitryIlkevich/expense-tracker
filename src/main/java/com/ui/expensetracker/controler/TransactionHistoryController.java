package com.ui.expensetracker.controler;

import java.time.LocalDate;
import java.util.List;

import com.ui.expensetracker.model.TransactionHistory;
import com.ui.expensetracker.model.TransactionHistoryDto;
import com.ui.expensetracker.service.TransactionHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * Handles requests about creating, retrieving and deleting user histories.
 *
 * @author dmitryilkevich
 */
@RestController
public class TransactionHistoryController {

    @Autowired
    private TransactionHistoryService transactionHistoryService;

    /**
     * Creates new transaction history
     *
     * @param transactionHistory Transaction history data
     * @return Created transaction history
     */
    @PostMapping("history")
    public TransactionHistory createTransactionHistory(@RequestBody TransactionHistoryDto transactionHistory) {
        return transactionHistoryService.createTransactionHistory(transactionHistory);
    }

    /**
     * @return All transaction histories dates
     */
    @GetMapping("history/date")
    public List<LocalDate> getAllTransactionHistoryDates() {
        return transactionHistoryService.getAllTransactionHistoryDates();
    }

    /**
     * @return All years in which user had transactions
     */
    @GetMapping("history/date/year")
    public List<Integer> getAllTransactionHistoryYears() {
        return transactionHistoryService.getAllHistoryTransactionYears();
    }

    /**
     * @param year Year to search month
     * @return All months in which user had transactions for the specific year
     */
    @GetMapping("history/date/year/{year}")
    public List<Integer> getAllHistoryTransactionByMonth(@PathVariable Long year) {
        return transactionHistoryService.getAllHistoryTransactionByMonth(year);
    }

    /**
     * @return All days in which user had transactions
     */
    @GetMapping("history/date/year/{year}/{month}")
    public List<Integer> getAllHistoryTransactionByYearAndMonth(@PathVariable Long year, @PathVariable Long month) {
        return transactionHistoryService.getAllHistoryTransactionByYearAndMonth(year, month);
    }

    /**
     * @return All transaction histories for the specific day
     */
    @GetMapping("history/date/year/{year}/{month}/{day}")
    public List<TransactionHistory> getAllHistoryTransactionByDay(@PathVariable Long year, @PathVariable Long month, @PathVariable Long day) {
        return transactionHistoryService.getAllHistoryTransactionByDay(year, month, day);
    }

    /**
     * Removes transaction history by the specific day
     *
     * @param historyId transaction history id
     */
    @DeleteMapping("history/{historyId}")
    public void getAllTransactionHistoryDates(@PathVariable Long historyId) {
        transactionHistoryService.deleteTransactionHistoryById(historyId);
    }
}
