package com.clouway.ta.adapter.frontend.orders;

/**
 * Created by Panayot Kulchev on 16-3-6.
 * e-mail: panayotkulchev@gmail.com
 * happy codding ...
 */
class NewOrderCommentRequest {
  public final Long orderId;
  public final String comment;

  @SuppressWarnings("unused")
  public NewOrderCommentRequest() {
    this.orderId = null;
    this.comment = null;
  }
}
