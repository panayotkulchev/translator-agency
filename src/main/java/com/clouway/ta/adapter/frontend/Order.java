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
  public String clientId;
  public String clientName;
  public String description;
  public String number;
  public Date createdOn;
  public Date createdBy;
  public Date updatedBy;

  @SuppressWarnings("unchecked")
  public Order() {
  }
}
