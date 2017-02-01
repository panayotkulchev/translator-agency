package com.clouway.ta.adapter.db.expenses;

import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Index;
import com.googlecode.objectify.annotation.Stringify;

import java.util.Date;

/**
 * Created by panayot on 03.02.17.
 */
@Entity
public class ExpenseEntity {

    @Id
    public Long id;
    public String type;
    public Double amount;
    @Index
    public Date date;
    public String description;

    @SuppressWarnings("unused")
    public ExpenseEntity() {
    }

    private ExpenseEntity(Builder builder) {
        id = builder.id;
        type = builder.type;
        amount = builder.amount;
        date = builder.date;
        description = builder.description;
    }

    public static Builder aNewExpenseEntity() {
        return new Builder();
    }


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

        public ExpenseEntity build() {
            return new ExpenseEntity(this);
        }
    }

    @Override
    public String toString() {
        return "ExpenseEntity{" +
                "id=" + id +
                ", type='" + type + '\'' +
                ", amount=" + amount +
                ", date=" + date +
                ", description='" + description + '\'' +
                '}';
    }
}
