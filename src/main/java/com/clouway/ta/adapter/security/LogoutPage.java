package com.clouway.ta.adapter.security;

import com.google.appengine.api.users.UserService;
import com.google.inject.Inject;
import com.google.sitebricks.At;
import com.google.sitebricks.Show;
import com.google.sitebricks.http.Get;

/**
 * Created by Panayot Kulchev on 16-2-7.
 * e-mail: panayotkulchev@gmail.com
 * happy codding ...
 */

@At("/logoutPage")
@Show("logout.html")
public class LogoutPage {

  private final UserService userService;

  @Inject
  public LogoutPage(UserService userService) {
    this.userService = userService;
  }

  @Get
  public String logout(){
    String logoutURL = userService.createLogoutURL("/loginPage");
    return logoutURL;
  }
}
