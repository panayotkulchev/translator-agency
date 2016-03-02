package com.clouway.ta.adapter.db.orders;

import com.clouway.ta.core.OrderRepository;
import com.clouway.ta.adapter.frontend.Order;
import com.clouway.ta.core.CurrentUser;
import com.clouway.ta.core.OrderStatus;
import com.google.inject.Inject;

import java.util.List;

import static com.clouway.ta.adapter.db.OfyService.ofy;

/**
 * Created by Panayot Kulchev on 16-2-18.
 * e-mail: panayotkulchev@gmail.com
 * happy codding ...
 */
public class PersistentOrderRepository implements OrderRepository {


  private final CurrentUser currentUser;

  @Inject
  public PersistentOrderRepository(CurrentUser currentUser) {
    this.currentUser = currentUser;
  }

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

    order.number = counter.increaseOrders();
    order.status = OrderStatus.RAW;
    order.createdOn = currentUser.getTime();
    order.createdBy = currentUser.email;
    ofy().save().entities(order, counter).now();
  }

  @Override
  public List<Order> getAll() {
    return ofy().load().type(Order.class).list();
  }

  @Override
  public Order get(Long orderId) {
    return ofy().load().type(Order.class).id(orderId).now();
  }

  @Override
  public void update(Order orderUpdate) {
    Order oldOrder = ofy().load().type(Order.class).id(orderUpdate.id).now();

    oldOrder.title = orderUpdate.title;
    oldOrder.clientId = orderUpdate.clientId;
    oldOrder.type = orderUpdate.type;
    oldOrder.clientName = orderUpdate.clientName;
    oldOrder.comment = orderUpdate.comment;
    oldOrder.priority = orderUpdate.priority;
    oldOrder.requireAttention = orderUpdate.requireAttention;
    oldOrder.updatedOn = currentUser.getTime();
    oldOrder.description = orderUpdate.description;
    oldOrder.updatedBy = currentUser.email;

    ofy().save().entity(oldOrder).now();
  }

  @Override
  public void assignOrder(Long orderId) {
    Order order = get(orderId);
    order.status = OrderStatus.ASSIGNED;
    update(order);
  }

  @Override
  public void executeOrder(Long orderId) {
    Order order = get(orderId);
    order.status = OrderStatus.EXECUTED;
    update(order);
  }

  @Override
  public void closeOrder(Long orderId) {
    Order order = get(orderId);
    order.status = OrderStatus.CLOSED;
    update(order);
  }
}