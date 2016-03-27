package com.clouway.ta.adapter.db.orders;

import com.clouway.ta.adapter.frontend.Comment;
import com.clouway.ta.core.users.CurrentUser;
import com.clouway.ta.core.orders.Order;
import com.clouway.ta.core.orders.OrderRepository;
import com.clouway.ta.core.orders.OrderStatus;
import com.google.api.client.util.Lists;
import com.google.inject.Inject;
import com.googlecode.objectify.VoidWork;

import java.util.List;

import static com.clouway.ta.adapter.db.OfyService.ofy;
import static com.clouway.ta.adapter.db.orders.OrderEntity.newOrderEntity;
import static com.clouway.ta.core.orders.Order.newOrder;

/**
 * Created by Panayot Kulchev on 16-2-18.
 * e-mail: panayotkulchev@gmail.com
 * happy codding ...
 */
public class PersistentOrderRepository implements OrderRepository {

  private final CurrentUser currentUser;
  private final OrdersCounter counter;

  @Inject
  public PersistentOrderRepository(CurrentUser currentUser, OrdersCounter counter) {
    this.currentUser = currentUser;
    this.counter = counter;
  }

  @Override
  public void register(Order order) {

    final OrderEntity entity = newOrderEntity()
            .status(OrderStatus.RAW)
            .title(order.title)
            .clientId(order.clientId)
            .clientName(order.clientName)
            .description(order.description)
            .number(counter.nextAvailable())
            .comment(order.comment)
            .createdOn(currentUser.getTime())
            .createdBy(currentUser.email)
            .requireAttention(order.requireAttention)
            .priority(order.priority)
            .type(order.type)
            .build();

    ofy().transact(new VoidWork() {
      @Override
      public void vrun() {
        ofy().save().entity(entity).now();
        ofy().save().entity(counter).now();
      }
    });
  }

  @Override
  public List<Order> getAll() {
    List<OrderEntity> entities = ofy().load().type(OrderEntity.class).list();
    return adapt(entities);
  }

  @Override
  public Order get(Long orderId) {
    OrderEntity entity = ofy().load().type(OrderEntity.class).id(orderId).now();
    return adapt(entity);
  }

  @Override
  public void update(Order orderUpdate) {
    OrderEntity entity = ofy().load().type(OrderEntity.class).id(orderUpdate.id).now();

    entity.setTitle(orderUpdate.title);
    entity.setType(orderUpdate.type);
    entity.setClientId(orderUpdate.clientId);
    entity.setClientName(orderUpdate.clientName);
    entity.setComment(orderUpdate.comment);
    entity.setPriority(orderUpdate.priority);
    entity.setRequireAttention(orderUpdate.requireAttention);
    entity.setUpdatedOn(currentUser.getTime());
    entity.setUpdatedBy(currentUser.email);
    entity.setDescription(orderUpdate.description);

    ofy().save().entity(entity).now();
  }

  @Override
  public void rawOrder(Long orderId) {
    OrderEntity entity = ofy().load().type(OrderEntity.class).id(orderId).now();
    entity.setStatus(OrderStatus.RAW);
    ofy().save().entity(entity).now();
  }

  @Override
  public void assignOrder(Long orderId) {
    OrderEntity entity = ofy().load().type(OrderEntity.class).id(orderId).now();
    entity.setStatus(OrderStatus.ASSIGNED);
    ofy().save().entity(entity).now();
  }

  @Override
  public void executeOrder(Long orderId) {
    OrderEntity entity = ofy().load().type(OrderEntity.class).id(orderId).now();
    entity.setStatus(OrderStatus.EXECUTED);
    ofy().save().entity(entity).now();
  }

  @Override
  public void closeOrder(Long orderId) {
    OrderEntity entity = ofy().load().type(OrderEntity.class).id(orderId).now();
    entity.setStatus(OrderStatus.CLOSED);
    ofy().save().entity(entity).now();
  }

  @Override
  public void addOrderComment(Long orderId, String content) {
    OrderEntity entity = ofy().load().type(OrderEntity.class).id(orderId).now();

    Comment comment = new Comment(currentUser.email, currentUser.getTime(), content);
    entity.addComment(comment);
    ofy().save().entity(entity).now();
  }

//  ADAPT METHODS

  private Order adapt(OrderEntity entity) {
    return newOrder()
            .id(entity.getId())
            .status(entity.getStatus())
            .title(entity.getTitle())
            .clientId(entity.getClientId())
            .clientName(entity.getClientName())
            .description(entity.getDescription())
            .number(entity.getNumber())
            .comment(entity.getComment())
            .createdOn(entity.getCreatedOn())
            .createdBy(entity.getCreatedBy())
            .updatedOn(entity.getUpdatedOn())
            .updatedBy(entity.getUpdatedBy())
            .requireAttention(entity.isRequireAttention())
            .priority(entity.isPriority())
            .type(entity.getType())
            .comments(entity.getComments())
            .build();
  }

  private List<Order> adapt(List<OrderEntity> entities) {
    List<Order> orders = Lists.newArrayList();

    for (OrderEntity entity: entities){
      orders.add(adapt(entity));
    }
    return orders;
  }

}
