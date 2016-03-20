package com.clouway.ta.core.users;

import java.util.Date;

/**
 * Created on 15-5-5.
 *
 * @author Panayot Kulchev <panayotkulchev@gmail.com>
 */

public class CurrentUser {

  public final String email;

  public CurrentUser(String email) {
    this.email = email;
  }

  public Date getTime (){
    return new Date();
  }
}
