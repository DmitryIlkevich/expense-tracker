package com.ui.expensetracker.model;

import lombok.Data;

/**
 * Data transfer object of transaction history.
 *
 * @author dmitryilkevich
 */
@Data
public class TransactionHistoryDto {

    private Long id;

    private String date;

    private Double cost;

    private String comment;

    private Long categoryId;
}
