package com.clouway.ta.adapter.frontend;

import com.google.appengine.api.users.UserService;
import com.google.inject.Inject;
import com.google.sitebricks.At;
import com.google.sitebricks.client.transport.Json;
import com.google.sitebricks.headless.Reply;
import com.google.sitebricks.headless.Service;
import com.google.sitebricks.http.Get;

/**
 * Created by Panayot Kulchev on 16-2-6.
 * e-mail: panayotkulchev@gmail.com
 * happy codding ...
 */

@Service
@At("/r/currentUser")
public class CurrentUserService {

  private final UserService userService;

  @Inject
  public CurrentUserService(UserService userService) {
    this.userService = userService;
  }

  @Get
  Reply currentUser(){
    return Reply.with(new CurrentUserDto(userService.getCurrentUser().getEmail())).as(Json.class);
  }

}
