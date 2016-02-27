package com.clouway.ta.adapter.frontend;

import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Index;

import java.util.Date;

/**
 * Created by Panayot Kulchev on 16-2-18.
 * e-mail: panayotkulchev@gmail.com
 * happy codding ...
 */

@Entity
public class Order {

  @Id
  public Long id;
  public String title;
  public Long clientId;
  public String clientName;
  public String description;
  public Long number;
  public String comment;
  public Long commentsNumber= 0L;
  public Date createdOn;
  public String createdBy;
  public Date updatedOn;
  public String updatedBy;
  public boolean requireAttention = false;
  public boolean priority = false;
  @Index
  public String type;

  @SuppressWarnings("unchecked")
  public Order() {
  }

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
