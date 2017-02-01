package com.clouway.ta.core.expenses;

import java.util.Date;

/**
 * Created by panayot on 03.02.17.
 */
public class Expense {

    public static final class Builder {
        private Long id;
        private String type;
        private Double amount;
        private Date date;
        private String description;

        private Builder() {
        }

        public Builder id(Long val) {
            id = val;
            return this;
        }

        public Builder type(String val) {
            type = val;
            return this;
        }

        public Builder amount(Double val) {
            amount = val;
            return this;
        }

        public Builder date(Date val) {
            date = val;
            return this;
        }

        public Builder description(String val) {
            description = val;
            return this;
        }

        public Expense build() {
            return new Expense(this);
        }
    }

    public static Builder aNewExpense() {
        return new Builder();
    }

    public final Long id;
    public final String type;
    public final Double amount;
    public final Date date;
    public final String description;

    private Expense(Builder builder) {
        id = builder.id;
        type = builder.type;
        amount = builder.amount;
        date = builder.date;
        description = builder.description;
    }
}
