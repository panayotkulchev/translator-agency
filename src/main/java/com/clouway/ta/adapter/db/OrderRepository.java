package com.clouway.ta.adapter.db;

import com.clouway.ta.adapter.frontend.Order;

import java.util.List;

/**
 * Created by Panayot Kulchev on 16-2-18.
 * e-mail: panayotkulchev@gmail.com
 * happy codding ...
 */
public interface OrderRepository {

  void register(Order order);

  List<Order> getAll();
}
