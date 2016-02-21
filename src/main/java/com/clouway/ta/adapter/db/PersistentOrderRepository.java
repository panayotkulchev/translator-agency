package com.clouway.ta.adapter.db;

import com.clouway.ta.adapter.frontend.Order;
import com.clouway.ta.core.OrdersCounter;

import java.util.Date;
import java.util.List;

import static com.clouway.ta.adapter.db.OfyService.ofy;

/**
 * Created by Panayot Kulchev on 16-2-18.
 * e-mail: panayotkulchev@gmail.com
 * happy codding ...
 */
public class PersistentOrderRepository implements OrderRepository {
  @Override
  public void register(Order order) {
    //inject counter with current user
    OrdersCounter counter;
    List<OrdersCounter> list = ofy().load().type(OrdersCounter.class).list();
    if(list.size()>0){
      counter = list.get(0);
    } else {
      counter = new OrdersCounter(1L, 0L);
      counter.reset();
      ofy().save().entity(counter).now();
    }

    order.createdOn = (new Date());
    order.number = counter.increaseOrders();
    ofy().save().entities(order, counter).now();
  }

  @Override
  public List<Order> getAll() {
    return ofy().load().type(Order.class).list();
  }
}
