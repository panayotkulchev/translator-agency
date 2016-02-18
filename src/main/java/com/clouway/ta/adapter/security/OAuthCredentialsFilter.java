package com.clouway.ta.adapter.security;

import com.google.appengine.api.users.UserService;
import com.google.inject.Inject;
import com.google.inject.Singleton;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * @author Panayot Kulchev <panayotkulchev@gmail.com>
 */

@Singleton
public class OAuthCredentialsFilter implements Filter {
  private final UserService userService;


  @Inject
  public OAuthCredentialsFilter(UserService userService) {
    this.userService = userService;
  }


  public void init(FilterConfig config) throws ServletException {
  }


  public void doFilter(ServletRequest req, ServletResponse resp, FilterChain chain) throws ServletException, IOException {
    System.out.println("oauth filter");

    HttpServletRequest request = (HttpServletRequest) req;
    String uri = request.getRequestURI();
    System.out.println(uri);

    if (!uri.contains("/login") && !uri.contains("/loginPage") && !uri.contains("/logout") && !uri.contains("/logoutPage")) {

      if (userService.getCurrentUser() != null) {
        String email = userService.getCurrentUser().getEmail();
        System.out.println(email);

      } else {
        System.out.println("UNAUTHORIZED");
        HttpServletResponse response = (HttpServletResponse) resp;
        response.sendError(HttpServletResponse.SC_UNAUTHORIZED);
        return;

      }

    }

    chain.doFilter(req, resp);

  }

  public void destroy() {
  }
}