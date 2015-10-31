package com.clouway.ta.adapter.db;

import com.clouway.ta.adapter.frontend.Language;
import com.clouway.ta.adapter.frontend.Translator;
import com.google.api.client.util.Lists;
import com.google.inject.Inject;
import com.vercer.engine.persist.ObjectDatastore;

import java.util.List;

/**
 * Created by Panayot Kulchev on 15-10-14.
 * e-mail: panayotkulchev@gmail.com
 * happy codding ...
 */
public class PersistentTranslatorRepository implements TranslatorRepository {

  private final ObjectDatastore datastore;

  @Inject
  public PersistentTranslatorRepository(ObjectDatastore datastore) {
    this.datastore = datastore;
  }

  @Override
  public void add(Translator translator) {
    datastore.store(translator, translator.email);
  }

  @Override
  public Translator getById(String translatorId) {

    return datastore.load(Translator.class, translatorId);
  }

  @Override
  public List<Translator> getById(List<String> ids) {

    List<Translator> translators = Lists.newArrayList();

    for(String each : ids){

      Translator translator = datastore.load(Translator.class, each);
      if (translator!=null){
        translators.add(translator);
      }
    }

    return translators;
  }

  @Override
  public void deleteById(String translatorId) {

    datastore.delete(datastore.load(Translator.class,translatorId));

  }
}
