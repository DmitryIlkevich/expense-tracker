package com.ui.expensetracker.service;

import com.ui.expensetracker.repository.TransactionHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Handles operations connected to summary of maney spent for the specific period.
 *
 * @author dmitryilkevich
 */
@Service
public class MoneyTrackerService {

    @Autowired
    private TransactionHistoryRepository repository;


    /**
     * Retrieves money spent by the specific year.
     *
     * @param year Target year
     * @return Money spent by the specific year
     */
    public Double getMoneySpentByYear(Long year) {
        return repository.findMoneySpendByYear("%" + year + "%");
    }

    /**
     * Retrieves money spent by the specific month of the year.
     *
     * @param year  Target year
     * @param month Target month
     * @return money spent by the specific month of the year
     */
    public Double getMoneySpentByMonth(Long year, Long month) {
        String resultMonth = String.valueOf(month);
        resultMonth = resultMonth.length() == 1 ? "0" + resultMonth : resultMonth;
        return repository.findMoneySpendByMonth("%" + year + "-" + resultMonth + "%");
    }

    /**
     * Retrieves money spent by the specific day.
     *
     * @param year  Target year
     * @param month Target month
     * @param day   Target day
     * @return money spent by the specific day
     */
    public Double getMoneySpentByDay(Long year, Long month, Long day) {
        String resultMonth = String.valueOf(month);
        resultMonth = resultMonth.length() == 1 ? "0" + resultMonth : resultMonth;
        return repository.findMoneySpendByDay(year + "-" + resultMonth + "-" + day);
    }
}
