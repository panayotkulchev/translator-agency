package com.clouway.ta.adapter.frontend.expenses;

import java.util.Date;

/**
 * Created by panayot on 03.02.17.
 */
class ExpenseDto{

    public static final class Builder {
        private Long id;
        private Date date;
        private String type;
        private Double amount;
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

        public ExpenseDto build() {
            return new ExpenseDto(this);
        }
    }

    public static Builder aNewExpenseDto() {
        return new Builder();
    }

        public final Long id;
        public final String type;
        public final Double amount;
        public final Date date;
        public final String description;

        @SuppressWarnings("unused")

    public ExpenseDto() {
        this.id = null;
        this.type = null;
        this.amount = null;
        this.date = null;
        this.description = null;
    }

    private ExpenseDto(Builder builder) {
        id = builder.id;
        type = builder.type;
        amount = builder.amount;
        date = builder.date;
        description = builder.description;
    }
}