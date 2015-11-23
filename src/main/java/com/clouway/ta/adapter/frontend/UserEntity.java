package com.clouway.ta.adapter.frontend;

import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Index;

/**
 * Created by Panayot Kulchev on 15-11-21.
 * e-mail: panayotkulchev@gmail.com
 * happy codding ...
 */
@Entity
public class UserEntity {

  @Id
  public String email;
  public String password;
  public boolean isAdmin;

  public UserEntity() {
  }

  public UserEntity(String email, String password) {
    this.email = email;
    this.password = password;
  }
}
