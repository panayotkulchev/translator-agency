package com.clouway.ta.adapter.db.orders;

import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;

/**
 * Created on 15-5-27.
 *
 * @author Panayot Kulchev <panayotkulchev@gmail.com>
 */

@Entity
public class OrdersCounter {

  @Id
  private Long id;
  private Long countOfOrders;

  public OrdersCounter() {
  }

  public OrdersCounter(Long id, Long countOfOrders) {
    this.id = id;
    this.countOfOrders = countOfOrders;
  }

  public void reset() {
    countOfOrders = 0L;
  }

  public Long getCountOfOrders() {
    return countOfOrders;
  }

  public void decreaseNumOfExpenses() {
    this.countOfOrders--;
  }

  public Long nextAvailabe() {
    countOfOrders++;
    return countOfOrders;
  }

  @Override
  public String toString() {
    return "Counter{" +
            "id='" + id + '\'' +
            ", countOfOrders=" + countOfOrders +
            '}';
  }
}
