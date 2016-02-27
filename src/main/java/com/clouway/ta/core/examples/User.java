package com.clouway.ta.core.examples;

/**
 * Created by Panayot Kulchev on 15-11-20.
 * e-mail: panayotkulchev@gmail.com
 * happy codding ...
 */
public class User {

  public final String email;
  public final String password;
  public final boolean isAdmin;

  public User(String email, String password, boolean isAdmin) {
    this.email = email;
    this.password = password;
    this.isAdmin = isAdmin;
  }
}
