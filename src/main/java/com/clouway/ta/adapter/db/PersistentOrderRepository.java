package com.clouway.ta.adapter.db;

import com.clouway.ta.adapter.frontend.Order;

import static com.clouway.ta.adapter.db.OfyService.ofy;

/**
 * Created by Panayot Kulchev on 16-2-18.
 * e-mail: panayotkulchev@gmail.com
 * happy codding ...
 */
public class PersistentOrderRepository implements OrderRepository{
  @Override
  public void register(Order order) {
    ofy().save().entity(order).now();
  }
}
