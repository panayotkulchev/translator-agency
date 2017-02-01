package com.clouway.ta.core.expenses;

import java.util.Date;
import java.util.List;

/**
 * Created by panayot on 06.02.17.
 */
public interface ExpensesRepository {
    void add (Expense expense);

    List<Expense> report(Date startDate, Date endDate);
}
