package com.clouway.ta.adapter.security;

import com.google.appengine.api.users.UserService;
import com.google.inject.Inject;
import com.google.sitebricks.At;
import com.google.sitebricks.headless.Reply;
import com.google.sitebricks.headless.Service;
import com.google.sitebricks.http.Get;

/**
 * Created by Panayot Kulchev on 16-2-6.
 * e-mail: panayotkulchev@gmail.com
 * happy codding ...
 */

@At("/login")
@Service
public class LoginService {

  private final UserService userService;

  @Inject
  public LoginService(UserService userService) {
    this.userService = userService;
  }

  @Get
  public Reply googleOAuthLogin(){
    return Reply.saying().redirect(userService.createLoginURL("/#/"));
  }

}
