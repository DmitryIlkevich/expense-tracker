package com.ui.expensetracker.controler;

import com.ui.expensetracker.service.MoneyTrackerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

/**
 * Handles requests to calculate money spent
 *
 * @author dmitryilkevich
 */
@RestController
public class MoneyTrackerController {

    @Autowired
    private MoneyTrackerService moneyTrackerService;

    /**
     * Retrieves sum of money spent for the specific year.
     *
     * @param year Year to calculate
     * @return Sum result
     */
    @GetMapping("spend/tracker/{year}")
    public Double getMoneySpentByYear(@PathVariable Long year) {
        return moneyTrackerService.getMoneySpentByYear(year);
    }

    /**
     * Retrieves money spent for the specific month of the specified year.
     *
     * @param year  Target year
     * @param month Target month
     * @return Sum result
     */
    @GetMapping("spend/tracker/{year}/{month}")
    public Double getMoneySpentByMonth(@PathVariable Long year,
                                       @PathVariable Long month) {
        return moneyTrackerService.getMoneySpentByMonth(year, month);
    }

    /**
     * Retrieves money count spent for the specific date.
     *
     * @param year  Target year
     * @param month Target month
     * @param day   Target day
     * @return Sum result
     */
    @GetMapping("spend/tracker/{year}/{month}/{day}")
    public Double getMoneySpentByDay(@PathVariable Long year,
                                     @PathVariable Long month,
                                     @PathVariable Long day) {
        return moneyTrackerService.getMoneySpentByDay(year, month, day);
    }
}
