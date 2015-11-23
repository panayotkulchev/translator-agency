package com.clouway.ta.adapter.db;

import com.clouway.ta.adapter.frontend.TranslatorService;
import com.clouway.ta.adapter.frontend.TranslatorServiceImpl;
import com.clouway.ta.core.SessionRepository;
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
    bind(TranslatorRepository.class).to(PersistentTranslatorRepository.class);
    bind(TranslatorService.class).to(TranslatorServiceImpl.class);
    bind(LanguageRepository.class).to(PersistentLanguageRepository.class);
    bind(SessionRepository.class).to(PersistentSessionRepository.class);
    bind(UserRepository.class).to(PersistentUserRepository.class);
    bind(ObjectifyFilter.class).in(Singleton.class);
  }

//  @Provides
//  public ObjectDatastore getDataStore() {
//    return new AnnotationObjectDatastore();
//  }
}
