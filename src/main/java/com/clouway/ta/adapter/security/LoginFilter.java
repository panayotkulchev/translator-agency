package com.clouway.ta.adapter.security;

import com.clouway.ta.core.examples.SessionManager;
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
 * Created on 15-5-5.
 *
 * @author Panayot Kulchev <panayotkulchev@gmail.com>
 */

@Singleton
public class LoginFilter implements Filter {

  private final SessionRepository sessionRepository;
  private final SidFetcher sidFetcher;
  private final SessionManager sessionManager;

  @Inject
  public LoginFilter(SessionRepository sessionRepository, SidFetcher sidFetcher, SessionManager sessionManager) {
    this.sessionRepository = sessionRepository;
    this.sidFetcher = sidFetcher;
    this.sessionManager = sessionManager;
  }

  public void init(FilterConfig config) throws ServletException {
  }

  public void doFilter(ServletRequest req, ServletResponse resp, FilterChain chain) throws ServletException, IOException {

    HttpServletResponse response = (HttpServletResponse) resp;

    String sid = sidFetcher.fetch();

    if (sid == null) {
      chain.doFilter(req, resp);
      return;
    }

    if (!sessionRepository.isExisting(sid)) {
      chain.doFilter(req, resp);
      return;
    }

    sessionManager.refresh();
    response.sendRedirect("/#/");

  }

  public void destroy() {
  }

}
