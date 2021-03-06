package com.clouway.ta.adapter.db;

import com.clouway.ta.adapter.db.clients.PersistentClientRepository;
import com.clouway.ta.adapter.db.expenses.PersistentExpensesRepository;
import com.clouway.ta.adapter.db.languages.PersistentLanguageRepository;
import com.clouway.ta.adapter.db.orders.PersistentOrderRepository;
import com.clouway.ta.adapter.db.translators.PersistentTranslatorRepository;
import com.clouway.ta.adapter.db.users.PersistentUserRepository;
import com.clouway.ta.core.clients.ClientRepository;
import com.clouway.ta.core.expenses.ExpensesRepository;
import com.clouway.ta.core.languages.LanguageRepository;
import com.clouway.ta.core.orders.OrderRepository;
import com.clouway.ta.core.translators.TranslatorRepository;
import com.clouway.ta.core.users.UserRepository;
import com.clouway.ta.core.examples.PersistentSessionRepository;
import com.clouway.ta.core.examples.SessionRepository;
import com.google.inject.AbstractModule;
import com.google.inject.Singleton;
import com.googlecode.objectify.ObjectifyFilter;

/**
 * Created on 15-7-14.
 *
 * @author Panayot Kulchev <panayotkulchev@gmail.com>
 */

public class PersistenceModule extends AbstractModule {
  @Override
  protected void configure() {
    bind(ExpensesRepository.class).to(PersistentExpensesRepository.class);
    bind(TranslatorRepository.class).to(PersistentTranslatorRepository.class);
    bind(LanguageRepository.class).to(PersistentLanguageRepository.class);
    bind(SessionRepository.class).to(PersistentSessionRepository.class);
    bind(UserRepository.class).to(PersistentUserRepository.class);
    bind(ClientRepository.class).to(PersistentClientRepository.class);
    bind(OrderRepository.class).to(PersistentOrderRepository.class);
    bind(ObjectifyFilter.class).in(Singleton.class);
  }

//  @Provides
//  public ObjectDatastore getDataStore() {
//    return new AnnotationObjectDatastore();
//  }
}
