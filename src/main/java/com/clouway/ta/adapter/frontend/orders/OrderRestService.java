package com.clouway.ta.adapter.frontend.orders;

import com.clouway.ta.core.orders.Order;
import com.clouway.ta.core.orders.OrderRepository;
import com.google.api.client.util.Lists;
import com.google.inject.Inject;
import com.google.inject.name.Named;
import com.google.sitebricks.At;
import com.google.sitebricks.client.transport.Json;
import com.google.sitebricks.headless.Reply;
import com.google.sitebricks.headless.Request;
import com.google.sitebricks.headless.Service;
import com.google.sitebricks.http.Get;
import com.google.sitebricks.http.Post;
import com.google.sitebricks.http.Put;

import java.util.List;

import static com.clouway.ta.adapter.frontend.orders.OrderDto.newOrderDto;
import static com.clouway.ta.core.orders.Order.newOrder;

/**
 * Created by Panayot Kulchev on 16-2-18.
 * e-mail: panayotkulchev@gmail.com
 * happy codding ...
 */

@Service
@At("/r/orders")
public class OrderRestService {

  private final OrderRepository orderRepository;

  @Inject
  public OrderRestService(OrderRepository orderRepository) {

    this.orderRepository = orderRepository;
  }

  @Get
  public Reply get(Request request) {
    String orderId = request.param("orderId");

    if (orderId != null) {
      Order order = orderRepository.get(Long.valueOf(orderId));
      OrderDto dto = adapt(order);
      return Reply.with(dto).as(Json.class);

    } else {
      List<Order> orders = orderRepository.getAll();
      List<OrderDto> dtos = adapt(orders);
      return Reply.with(dtos).as(Json.class);
    }
  }

  @At("/search")
  @Get
  public Reply search(Request request) {
    String filter = (request.param("filter"));
    Integer offset = Integer.parseInt(request.param("offset"));
    Integer limit = Integer.parseInt(request.param("limit"));

    List<Order> orders = orderRepository.search(filter, offset, limit);
    List<OrderDto> dtos = adapt(orders);

    return Reply.with(dtos).as(Json.class);
  }

  @At("/closed")
  @Get
  public Reply getClosed(Request request) {

    List<Order> orders = orderRepository.getClosed();
    List<OrderDto> dtos = adapt(orders);

    return Reply.with(dtos).as(Json.class);
  }

  @Post
  public Reply register(Request request) {

    OrderDto orderDto = request.read(OrderDto.class).as(Json.class);

    Order order = adapt(orderDto);

    orderRepository.register(order);

    return Reply.saying().ok();
  }

  @Put
  public Reply update(Request request) {

    OrderDto orderDto = request.read(OrderDto.class).as(Json.class);

    Order order = adapt(orderDto);

    orderRepository.update(order);

    return Reply.saying().ok();
  }

  @Put
  @At("/:orderId/raw")
  public Reply rawOrder(@Named("orderId") Long orderId) {

    orderRepository.rawOrder(orderId);

    return Reply.saying().ok();
  }

  @Put
  @At("/:orderId/assign")
  public Reply assignOrder(@Named("orderId") Long orderId) {

    orderRepository.assignOrder(orderId);

    return Reply.saying().ok();
  }

  @Put
  @At("/:orderId/execute")
  public Reply executeOrder(@Named("orderId") Long orderId) {

    orderRepository.executeOrder(orderId);

    return Reply.saying().ok();
  }

  @Put
  @At("/:orderId/close")
  public Reply closeOrder(@Named("orderId") Long orderId) {

    orderRepository.closeOrder(orderId);

    return Reply.saying().ok();
  }

  @At("/:orderId/comment")
  @Post
  public Reply addOrderComment(Request request) {

    NewOrderCommentRequest req = request.read(NewOrderCommentRequest.class).as(Json.class);

    orderRepository.addOrderComment(req.orderId, req.comment);

    return Reply.saying().ok();
  }

  //  ADAPT METHODS
  private Order adapt(OrderDto orderDto) {
    return newOrder()
            .id(orderDto.id)
            .type(orderDto.type)
            .status(orderDto.status)
            .title(orderDto.title)
            .clientId(orderDto.clientId)
            .clientName(orderDto.clientName)
            .description(orderDto.description)
            .comment(orderDto.comment)
            .requireAttention(orderDto.requireAttention)
            .priority(orderDto.priority)
            .build();
  }

  private OrderDto adapt(Order order) {
    return newOrderDto()
            .id(order.id)
            .status(order.status)
            .title(order.title)
            .clientId(order.clientId)
            .clientName(order.clientName)
            .description(order.description)
            .number(order.number)
            .comment(order.comment)
            .createdOn(order.createdOn)
            .createdBy(order.createdBy)
            .updatedOn(order.updatedOn)
            .updatedBy(order.updatedBy)
            .requireAttention(order.requireAttention)
            .priority(order.priority)
            .type(order.type)
            .comments(order.comments)
            .build();
  }

  private List<OrderDto> adapt(List<Order> orders) {
    List<OrderDto> dtos = Lists.newArrayList();

    for (Order order : orders) {
      dtos.add(adapt(order));
    }
    return dtos;
  }

}
