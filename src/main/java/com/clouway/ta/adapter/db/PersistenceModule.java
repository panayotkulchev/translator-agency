package com.clouway.ta.adapter.db;

import com.clouway.ta.adapter.db.LanguageRepository;
import com.clouway.ta.adapter.db.PersistentLanguageRepository;
import com.clouway.ta.adapter.db.PersistentTranslatorRepository;
import com.clouway.ta.adapter.db.TranslatorRepository;
import com.clouway.ta.adapter.frontend.TranslatorService;
import com.clouway.ta.adapter.frontend.TranslatorServiceImpl;
import com.google.inject.AbstractModule;
import com.google.inject.Provides;
import com.vercer.engine.persist.ObjectDatastore;
import com.vercer.engine.persist.annotation.AnnotationObjectDatastore;

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
  }

  @Provides
  public ObjectDatastore getDataStore() {
    return new AnnotationObjectDatastore();
  }
}
