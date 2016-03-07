package com.clouway.ta.adapter.frontend.orders;

import com.clouway.ta.core.orders.OrderRepository;
import com.clouway.ta.adapter.frontend.Order;
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
  public Reply get(Request request){
    String orderId = request.param("orderId");

    if (orderId!=null){
      Order order = orderRepository.get(Long.valueOf(orderId));
      return Reply.with(order).as(Json.class);
    }

    else {
      List<Order> orderList = orderRepository.getAll();
      return Reply.with(orderList).as(Json.class);
    }
  }

  @Post
  public Reply register(Request request){

    Order order = request.read(Order.class).as(Json.class);

    orderRepository.register(order);

    return Reply.saying().ok();
  }

  @Put
  public Reply update(Request request){

    Order order = request.read(Order.class).as(Json.class);

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
  public Reply addOrderComment(Request request){

    NewOrderCommentRequest req= request.read(NewOrderCommentRequest.class).as(Json.class);

    orderRepository.addOrderComment(req.orderId, req.comment);

    return Reply.saying().ok();
  }

}
