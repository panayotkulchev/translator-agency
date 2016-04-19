package com.clouway.ta.core.orders;

import java.util.List;

/**
 * Created by Panayot Kulchev on 16-2-18.
 * e-mail: panayotkulchev@gmail.com
 * happy codding ...
 */
public interface OrderRepository {

  void register(Order order);

  List<Order> getAll();

  List<Order> getClosed();

  Order get(Long orderId);

  void update(Order order);

  void rawOrder(Long orderId);

  void assignOrder(Long orderId);

  void executeOrder(Long orderId);

  void closeOrder(Long orderId);

  void addOrderComment(Long orderId, String comment);

  List<Order> search(String filter, Integer offset, Integer limit);
}
