package com.clouway.ta.core.orders;

import com.clouway.ta.adapter.frontend.Comment;

import java.util.Date;
import java.util.List;

/**
 * Created by Panayot Kulchev on 16-3-10.
 * e-mail: panayotkulchev@gmail.com
 * happy codding ...
 */
public class Order {

  public static final class Builder {
    private Long id;
    private String status;
    private String title;
    private Long clientId;
    private String clientName;
    private String description;
    private Long number;
    private String comment;
    private Date createdOn;
    private String createdBy;
    private Date updatedOn;
    private String updatedBy;
    private boolean requireAttention;
    private boolean priority;
    private String type;
    private List<Comment> comments;

    private Builder() {
    }

    public Builder id(Long val) {
      id = val;
      return this;
    }

    public Builder status(String val) {
      status = val;
      return this;
    }

    public Builder title(String val) {
      title = val;
      return this;
    }

    public Builder clientId(Long val) {
      clientId = val;
      return this;
    }

    public Builder clientName(String val) {
      clientName = val;
      return this;
    }

    public Builder description(String val) {
      description = val;
      return this;
    }

    public Builder number(Long val) {
      number = val;
      return this;
    }

    public Builder comment(String val) {
      comment = val;
      return this;
    }

    public Builder createdOn(Date val) {
      createdOn = val;
      return this;
    }

    public Builder createdBy(String val) {
      createdBy = val;
      return this;
    }

    public Builder updatedOn(Date val) {
      updatedOn = val;
      return this;
    }

    public Builder updatedBy(String val) {
      updatedBy = val;
      return this;
    }

    public Builder requireAttention(boolean val) {
      requireAttention = val;
      return this;
    }

    public Builder priority(boolean val) {
      priority = val;
      return this;
    }

    public Builder type(String val) {
      type = val;
      return this;
    }

    public Builder comments(List<Comment> val) {
      comments = val;
      return this;
    }

    public Order build() {
      return new Order(this);
    }
  }

  public static Builder newOrder() {
    return new Builder();
  }

  public final Long id;
  public final String status;
  public final String title;
  public final Long clientId;
  public final String clientName;
  public final String description;
  public final Long number;
  public final String comment;
  public final Date createdOn;
  public final String createdBy;
  public final Date updatedOn;
  public final String updatedBy;
  public final boolean requireAttention;
  public final boolean priority;
  public final String type;
  public final List<Comment> comments;

  @SuppressWarnings("unused")
  public Order() {
    this.id = null;
    this.status = null;
    this.title = null;
    this.clientId = null;
    this.clientName = null;
    this.description = null;
    this.number = null;
    this.comment = null;
    this.createdOn = null;
    this.createdBy = null;
    this.updatedOn = null;
    this.updatedBy = null;
    this.requireAttention = false;
    this.priority = false;
    this.type = null;
    this.comments = null;
  }

  private Order(Builder builder) {
    id = builder.id;
    status = builder.status;
    title = builder.title;
    clientId = builder.clientId;
    clientName = builder.clientName;
    description = builder.description;
    number = builder.number;
    comment = builder.comment;
    createdOn = builder.createdOn;
    createdBy = builder.createdBy;
    updatedOn = builder.updatedOn;
    updatedBy = builder.updatedBy;
    requireAttention = builder.requireAttention;
    priority = builder.priority;
    type = builder.type;
    comments = builder.comments;
  }
}
