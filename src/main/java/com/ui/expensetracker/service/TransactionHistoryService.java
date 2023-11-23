package com.ui.expensetracker.service;

import java.sql.Date;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

import com.ui.expensetracker.model.Category;
import com.ui.expensetracker.model.TransactionHistory;
import com.ui.expensetracker.model.TransactionHistoryDto;
import com.ui.expensetracker.repository.CategoryRepository;
import com.ui.expensetracker.repository.TransactionHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Responsible for business logic of transaction history.
 *
 * @author dmitryilkevich
 */
@Service
public class TransactionHistoryService {

    @Autowired
    private TransactionHistoryRepository transactionHistoryRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    /**
     * Retrieves all transactions dates
     *
     * @return transactions dates
     */
    public List<LocalDate> getAllTransactionHistoryDates() {
        return transactionHistoryRepository.findAllDates().stream()
                .map(Date::toLocalDate)
                .sorted()
                .collect(Collectors.toList());
    }

    /**
     * @return All years in which user had transactions
     */
    public List<Integer> getAllHistoryTransactionYears() {
        return transactionHistoryRepository.findAllDates().stream()
                .map(Date::toLocalDate)
                .map(LocalDate::getYear)
                .sorted()
                .distinct()
                .collect(Collectors.toList());
    }

    /**
     * @return All months values in which user had transactions for the specific year
     */
    public List<Integer> getAllHistoryTransactionByMonth(Long year) {
        return transactionHistoryRepository.findAllDates().stream()
                .map(Date::toLocalDate)
                .filter(d -> d.getYear() == year)
                .map(LocalDate::getMonthValue)
                .sorted()
                .distinct()
                .collect(Collectors.toList());
    }

    /**
     * @return All months in which user had transactions for the specific year
     */
    public List<Integer> getAllHistoryTransactionByYearAndMonth(Long year, Long month) {
        return transactionHistoryRepository.findAllDates().stream()
                .map(Date::toLocalDate)
                .filter(d -> d.getYear() == year)
                .filter(d -> d.getMonthValue() == month)
                .map(LocalDate::getDayOfMonth)
                .sorted()
                .distinct()
                .collect(Collectors.toList());
    }

    /**
     * @return All transaction histories for the specific day
     */
    public List<TransactionHistory> getAllHistoryTransactionByDay(Long year, Long month, Long day) {
        LocalDate localDate = LocalDate.of(Math.toIntExact(year), Math.toIntExact(month), Math.toIntExact(day));
        return transactionHistoryRepository.getTransactionHistoriesByTransactionDate(localDate);
    }

    /**
     * Removes transaction history from database.
     *
     * @param historyId id to remove
     */
    public void deleteTransactionHistoryById(Long historyId) {
        transactionHistoryRepository.deleteById(historyId);
    }

    /**
     * Creates new transaction history
     *
     * @param transactionHistoryDto transaction history DTO
     * @return Created history
     */
    public TransactionHistory createTransactionHistory(TransactionHistoryDto transactionHistoryDto) {
        Category category = categoryRepository.findById(transactionHistoryDto.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Unable to find category ID " + transactionHistoryDto.getCategoryId()));

        TransactionHistory transactionHistory = TransactionHistory.builder()
                .transactionDate(LocalDate.parse(transactionHistoryDto.getDate(), DateTimeFormatter.ofPattern("dd-MM-yyyy")))
                .comment(transactionHistoryDto.getComment())
                .transactionValue(transactionHistoryDto.getCost())
                .category(category)
                .build();

        return transactionHistoryRepository.save(transactionHistory);
    }
}
