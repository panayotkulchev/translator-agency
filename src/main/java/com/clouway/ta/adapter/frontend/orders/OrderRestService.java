package com.clouway.ta.adapter.frontend.orders;

import com.clouway.ta.core.OrderRepository;
import com.clouway.ta.adapter.frontend.Order;
import com.google.inject.Inject;
import com.google.sitebricks.At;
import com.google.sitebricks.client.transport.Json;
import com.google.sitebricks.headless.Reply;
import com.google.sitebricks.headless.Request;
import com.google.sitebricks.headless.Service;
import com.google.sitebricks.http.Get;
import com.google.sitebricks.http.Post;

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
  public Reply getAll(Request request){

    List<Order> orderList = orderRepository.getAll();

    return Reply.with(orderList).as(Json.class);
  }

  @Post
  public Reply register(Request request){

    Order order = request.read(Order.class).as(Json.class);

    orderRepository.register(order);

    return Reply.saying().ok();
  }

}
