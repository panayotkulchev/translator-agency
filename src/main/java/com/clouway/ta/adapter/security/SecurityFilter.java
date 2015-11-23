package com.clouway.ta.adapter.security;

import com.clouway.ta.adapter.db.UserRepository;
import com.google.appengine.api.users.User;
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
 * Created by Panayot Kulchev on 15-11-20.
 * e-mail: panayotkulchev@gmail.com
 * happy codding ...
 */
@Singleton
public class SecurityFilter implements Filter {

  private UserService userService;
  private UserRepository userRepository;

  @Inject
  public SecurityFilter(UserService userService, UserRepository userRepository) {
    this.userService = userService;
    this.userRepository = userRepository;
  }

  @Override
  public void init(FilterConfig filterConfig) throws ServletException {

  }

  @Override
  public void doFilter(ServletRequest req, ServletResponse resp, FilterChain chain) throws IOException, ServletException {

    HttpServletRequest req1 = (HttpServletRequest) req;

    String thisURL =req1.getRequestURI();

    resp.setContentType("text/html");
    if (req1.getUserPrincipal() != null) {
      resp.getWriter().println("<p>Hello, " +
              req1.getUserPrincipal().getName() +
              "!  You can <a href=\"" +
              userService.createLogoutURL("/google.com") +
              "\">sign out</a>.</p>");
      System.out.println(userService.getCurrentUser().getEmail());
    } else {
      resp.getWriter().println("<p>Please <a href=\"" +
              userService.createLoginURL("http://google.com") +
              "\">sign in</a>.</p>");
    }

//    System.out.println("Filter");
//    User currentUser = userService.getCurrentUser();
//
//    if (currentUser!=null && !userRepository.isExist(currentUser.getEmail())){
//
//      HttpServletResponse response = (HttpServletResponse) resp;
//
//      response.sendError(HttpServletResponse.SC_UNAUTHORIZED);
//      return;
//    }
//
//    chain.doFilter(req, resp);
  }

  @Override
  public void destroy() {

  }
}
