package com.clouway.ta.adapter.transport;

import com.clouway.ta.adapter.db.orders.OrdersCounter;
import com.google.inject.Inject;
import com.google.inject.Singleton;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.util.logging.Level;
import java.util.logging.Logger;

import static com.clouway.ta.adapter.db.OfyService.ofy;

/**
 * Created by Panayot Kulchev on 15-10-14.
 * e-mail: panayotkulchev@gmail.com
 * happy codding ...
 */
@Singleton
public class PingServlet extends HttpServlet {


  private static final Logger log = Logger.getLogger(PingServlet.class.getName());


  private HttpServletRequest request;


  @Inject
  public PingServlet() {

  }

  @Override
  protected void doGet(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) throws ServletException, IOException {
    doPost(httpServletRequest, httpServletResponse);
  }

  @Override
  protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    this.request = request;
    PrintWriter writer = new PrintWriter(new OutputStreamWriter(response.getOutputStream(), "UTF8"), true);

    String task = request.getParameter("task");

    //   /ping?task=init
    if ("init".equals(task)) {

      initOrdersCounter();

      log.log(Level.INFO, "Counter initialized.");
      writer.println("DONE");
    }
  }


  private void initOrdersCounter(){
    OrdersCounter counter = new OrdersCounter(1L, 0L);
    ofy().save().entity(counter).now();
  }
}