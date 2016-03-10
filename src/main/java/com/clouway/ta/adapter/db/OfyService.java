package com.clouway.ta.adapter.db;

import com.clouway.ta.adapter.db.clients.ClientEntity;
import com.clouway.ta.adapter.db.languages.LanguageEntity;
import com.clouway.ta.adapter.db.orders.OrdersCounter;
import com.clouway.ta.adapter.db.orders.OrderEntity;
import com.clouway.ta.adapter.db.translators.TranslatorEntity;
import com.clouway.ta.adapter.frontend.UserEntity;
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
    ObjectifyService.register(LanguageEntity.class);
    ObjectifyService.register(TranslatorEntity.class);
    ObjectifyService.register(UserEntity.class);
    ObjectifyService.register(ClientEntity.class);
    ObjectifyService.register(SessionEntity.class);
    ObjectifyService.register(OrderEntity.class);
    ObjectifyService.register(OrdersCounter.class);
  }

  public static Objectify ofy() {
    return ObjectifyService.ofy();
  }

  public static ObjectifyFactory factory() {
    return ObjectifyService.factory();
  }
}
