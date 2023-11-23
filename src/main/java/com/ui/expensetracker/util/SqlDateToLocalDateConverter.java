package com.ui.expensetracker.util;

import java.sql.Date;
import java.time.LocalDate;
import java.util.Optional;

import jakarta.persistence.AttributeConverter;

public class SqlDateToLocalDateConverter implements AttributeConverter<LocalDate, Date> {

    @Override
    public Date convertToDatabaseColumn(LocalDate localDate) {
        return Optional.ofNullable(localDate)
                .map(Date::valueOf)
                .orElse(null);
    }

    // converts sql date to LocalDate using toLocalDate() method
    @Override
    public LocalDate convertToEntityAttribute(Date date) {
        return Optional.ofNullable(date)
                .map(Date::toLocalDate)
                .orElse(null);
    }
}
