package com.clouway.ta.adapter.db;

import com.clouway.ta.adapter.frontend.Client;
import com.clouway.ta.adapter.frontend.Language;
import com.clouway.ta.adapter.frontend.Order;
import com.clouway.ta.adapter.frontend.Translator;
import com.clouway.ta.adapter.frontend.UserEntity;
import com.clouway.ta.adapter.db.orders.OrdersCounter;
import com.clouway.ta.core.examples.SessionEntity;
import com.googlecode.objectify.Objectify;
import com.googlecode.objectify.ObjectifyFactory;
import com.googlecode.objectify.ObjectifyService;

/**
 * Created by Panayot Kulchev on 15-11-3.
 * e-mail: panayotkulchev@gmail.com
 * happy codding ...
 */
public class OfyService {

  static {
    ObjectifyService.register(Language.class);
    ObjectifyService.register(Translator.class);
    ObjectifyService.register(UserEntity.class);
    ObjectifyService.register(Client.class);
    ObjectifyService.register(SessionEntity.class);
    ObjectifyService.register(Order.class);
    ObjectifyService.register(OrdersCounter.class);

  }

  public static Objectify ofy() {
    return ObjectifyService.ofy();
  }

  public static ObjectifyFactory factory() {
    return ObjectifyService.factory();
  }
}
