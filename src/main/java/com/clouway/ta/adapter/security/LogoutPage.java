package com.clouway.ta.adapter.security;

import com.google.inject.Inject;
import com.google.sitebricks.At;
import com.google.sitebricks.headless.Reply;
import com.google.sitebricks.headless.Service;
import com.google.sitebricks.http.Get;

/**
 * Created on 15-5-5.
 *
 * @author Panayot Kulchev <panayotkulchev@gmail.com>
 */

@At("/logout")
@Service
public class LogoutPage {

  private final UserSessionManager userSession;

  @Inject
  public LogoutPage(UserSessionManager userSession) {
    this.userSession = userSession;
  }

  @Get
  private Reply logOut() {

    userSession.delete();

    return Reply.saying().redirect("/login?message=You are logged out!");
  }
}
