package com.clouway.ta.core;

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

  Order get(Long orderId);

  void update(Order order);

  void rawOrder(Long orderId);

  void assignOrder(Long orderId);

  void executeOrder(Long orderId);

  void closeOrder(Long orderId);
}
