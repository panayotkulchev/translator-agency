package com.clouway.ta.adapter.db.orders;

import com.clouway.ta.adapter.frontend.Comment;
import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Index;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by Panayot Kulchev on 16-2-18.
 * e-mail: panayotkulchev@gmail.com
 * happy codding ...
 */

@Entity
public class OrderEntity {

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

    public OrderEntity build() {
      return new OrderEntity(this);
    }
  }

  public static Builder newOrderEntity() {
    return new Builder();
  }

  @Id
  private Long id;
  @Index
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
  private boolean requireAttention = false;
  private boolean priority = false;
  @Index
  private String type;
  private List<Comment> comments = new ArrayList<>();

  @SuppressWarnings("unchecked")
  public OrderEntity() {
  }

  private OrderEntity(Builder builder) {
    setId(builder.id);
    setStatus(builder.status);
    setTitle(builder.title);
    setClientId(builder.clientId);
    setClientName(builder.clientName);
    setDescription(builder.description);
    setNumber(builder.number);
    setComment(builder.comment);
    setCreatedOn(builder.createdOn);
    setCreatedBy(builder.createdBy);
    setUpdatedOn(builder.updatedOn);
    setUpdatedBy(builder.updatedBy);
    setRequireAttention(builder.requireAttention);
    setPriority(builder.priority);
    setType(builder.type);
    setComments(builder.comments);
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getStatus() {
    return status;
  }

  public void setStatus(String status) {
    this.status = status;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public Long getClientId() {
    return clientId;
  }

  public void setClientId(Long clientId) {
    this.clientId = clientId;
  }

  public String getClientName() {
    return clientName;
  }

  public void setClientName(String clientName) {
    this.clientName = clientName;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public Long getNumber() {
    return number;
  }

  public void setNumber(Long number) {
    this.number = number;
  }

  public String getComment() {
    return comment;
  }

  public void setComment(String comment) {
    this.comment = comment;
  }

  public Date getCreatedOn() {
    return createdOn;
  }

  public void setCreatedOn(Date createdOn) {
    this.createdOn = createdOn;
  }

  public String getCreatedBy() {
    return createdBy;
  }

  public void setCreatedBy(String createdBy) {
    this.createdBy = createdBy;
  }

  public Date getUpdatedOn() {
    return updatedOn;
  }

  public void setUpdatedOn(Date updatedOn) {
    this.updatedOn = updatedOn;
  }

  public String getUpdatedBy() {
    return updatedBy;
  }

  public void setUpdatedBy(String updatedBy) {
    this.updatedBy = updatedBy;
  }

  public boolean isRequireAttention() {
    return requireAttention;
  }

  public void setRequireAttention(boolean requireAttention) {
    this.requireAttention = requireAttention;
  }

  public boolean isPriority() {
    return priority;
  }

  public void setPriority(boolean priority) {
    this.priority = priority;
  }

  public String getType() {
    return type;
  }

  public void setType(String type) {
    this.type = type;
  }

  public List<Comment> getComments() {
    return comments;
  }

  public void setComments(List<Comment> comments) {
    this.comments = comments;
  }

  public void addComment(Comment comment){
    this.comments.add(comment);
  };

  @Override
  public String toString() {
    return "Order{" +
            "id=" + id +
            ", title='" + title + '\'' +
            ", clientId='" + clientId + '\'' +
            ", clientName='" + clientName + '\'' +
            ", description='" + description + '\'' +
            ", number='" + number + '\'' +
            ", createdOn=" + createdOn +
            ", createdBy=" + createdBy +
            ", updatedBy=" + updatedBy +
            '}';
  }
}
