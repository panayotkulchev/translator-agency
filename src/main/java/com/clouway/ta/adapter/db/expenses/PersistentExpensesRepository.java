package com.clouway.ta.adapter.db.expenses;

import com.clouway.ta.core.expenses.Expense;
import com.clouway.ta.core.expenses.ExpensesRepository;
import com.google.common.collect.Lists;

import java.util.Date;
import java.util.List;

import static com.clouway.ta.adapter.db.OfyService.ofy;
import static com.clouway.ta.adapter.db.expenses.ExpenseEntity.aNewExpenseEntity;
import static com.clouway.ta.core.expenses.Expense.aNewExpense;

/**
 * Created by panayot on 06.02.17.
 */
public class PersistentExpensesRepository implements ExpensesRepository{
    @Override
    public void add(Expense expense) {

        ExpenseEntity expenseEntity = aNewExpenseEntity()
                .type(expense.type)
                .amount(expense.amount)
                .date(expense.date)
                .description(expense.description)
                .build();

        ofy().save().entity(expenseEntity).now();
    }

    @Override
    public List<Expense> report(Date startDate, Date endDate) {
        List<ExpenseEntity> list = ofy().load().type(ExpenseEntity.class).filter("date >=", startDate).filter("date <=", endDate).list();
        return adapt(list);
    }

    private List<Expense> adapt(List<ExpenseEntity> expenses) {
        List<Expense> result = Lists.newArrayList();
        for (ExpenseEntity expense: expenses){
            result.add(adapt(expense));
            System.out.println(expense);
        }
        return result;
    }

    private Expense adapt(ExpenseEntity expense){
        return aNewExpense()
                .id(expense.id)
                .type(expense.type)
                .amount(expense.amount)
                .date(expense.date)
                .description(expense.description)
                .build();
    }
}
