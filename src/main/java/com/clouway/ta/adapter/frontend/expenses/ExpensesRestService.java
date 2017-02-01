package com.clouway.ta.adapter.frontend.expenses;

import com.clouway.ta.core.expenses.Expense;
import com.clouway.ta.core.expenses.ExpensesRepository;
import com.google.common.collect.Lists;
import com.google.inject.Inject;
import com.google.inject.name.Named;
import com.google.sitebricks.At;
import com.google.sitebricks.client.transport.Json;
import com.google.sitebricks.headless.Reply;
import com.google.sitebricks.headless.Request;
import com.google.sitebricks.headless.Service;
import com.google.sitebricks.http.Get;
import com.google.sitebricks.http.Post;
import org.joda.time.DateTime;

import java.util.Date;
import java.util.List;

import static com.clouway.ta.adapter.frontend.expenses.ExpenseDto.aNewExpenseDto;
import static com.clouway.ta.core.expenses.Expense.aNewExpense;

/**
 * Created by panayot on 03.02.17.
 */
@Service
@At("/r/expenses")
public class ExpensesRestService {

    private final ExpensesRepository expensesRepository;

    @Inject
    public ExpensesRestService(ExpensesRepository expensesRepository) {
        this.expensesRepository = expensesRepository;
    }

    @Get
    @At("/report/:startDate/:endDate")
    public Reply<?> report(@Named("startDate") Long startDateString, @Named("endDate") Long endDateString){

        Date startDate = new Date(startDateString);
        Date endDate = new Date(endDateString);

        List<Expense> expenses = expensesRepository.report(startDate, endDate);

        List<ExpenseDto> invoiceDtos = adapt(expenses);

        return Reply.with(invoiceDtos).as(Json.class);
    }

    @Post
    public Reply<?> register(Request request) {

        ExpenseDto expenseDto = request.read(ExpenseDto.class).as(Json.class);
        Expense expense = adapt(expenseDto);
        expensesRepository.add(expense);

        return Reply.saying().ok();
    }

    private Expense adapt(ExpenseDto expenseDto) {
        return aNewExpense()
                .type(expenseDto.type)
                .amount(expenseDto.amount)
                .date(expenseDto.date)
                .description(expenseDto.description)
                .build();
    }

    private List<ExpenseDto> adapt (List<Expense> expenses){
        List<ExpenseDto> result = Lists.newArrayList();
        for (Expense expense: expenses){
            result.add(adapt(expense));
        }
        return result;
    };

    private ExpenseDto adapt(Expense expense){
        return aNewExpenseDto()
                .id(expense.id)
                .type(expense.type)
                .amount(expense.amount)
                .date(expense.date)
                .description(expense.description)
                .build();
    }
}
