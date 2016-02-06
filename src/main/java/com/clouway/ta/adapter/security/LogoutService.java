package com.clouway.ta.adapter.security;

import com.google.appengine.api.users.UserService;
import com.google.inject.Inject;
import com.google.inject.Provider;
import com.google.sitebricks.At;
import com.google.sitebricks.headless.Reply;
import com.google.sitebricks.headless.Service;
import com.google.sitebricks.http.Get;

import javax.servlet.http.HttpServletRequest;

/**
 * Created on 15-5-5.
 *
 * @author Panayot Kulchev <panayotkulchev@gmail.com>
 */

@At("/logout")
@Service
public class LogoutService {

  private final UserService userService;
  private final Provider<HttpServletRequest> requestProvider;

  @Inject
  public LogoutService(UserService userService, Provider<HttpServletRequest> requestProvider) {

    this.userService = userService;
    this.requestProvider = requestProvider;
  }

  @Get
  private Reply logOut() {
    String logoutURL = userService.createLogoutURL("/loginPage");
    return Reply.saying().redirect(logoutURL);
  }
}
