package com.clouway.ta.adapter.security;

import com.clouway.ta.core.examples.SessionRepository;
import com.clouway.ta.core.examples.SidFetcher;
import com.google.inject.Inject;
import com.google.inject.Singleton;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Created on 15-6-4.
 *
 * @author Panayot Kulchev <panayotkulchev@gmail.com>
 */

@Singleton
public class MainPageSecurityFilter implements Filter {

  private final SessionRepository sessionRepository;
  private final SidFetcher sidFetcher;
  private final UserSessionManager userSession;

  @Inject
  public MainPageSecurityFilter(SessionRepository sessionRepository,
                                SidFetcher sidFetcher,
                                UserSessionManager userSession) {

    this.sessionRepository = sessionRepository;
    this.sidFetcher = sidFetcher;
    this.userSession = userSession;
  }

  public void init(FilterConfig config) throws ServletException {
  }

  public void doFilter(ServletRequest req, ServletResponse resp, FilterChain chain) throws ServletException, IOException {


    sessionRepository.cleanExpired();

    HttpServletResponse response = (HttpServletResponse) resp;
    String sid = sidFetcher.fetch();


    if (sid == null) {
      response.sendRedirect("/login");
      return;
    }

    if (!sessionRepository.isExisting(sid)) {
      response.sendRedirect("/login");
      return;
    }

    userSession.refresh();
    chain.doFilter(req, resp);
  }

  public void destroy() {
  }
}
