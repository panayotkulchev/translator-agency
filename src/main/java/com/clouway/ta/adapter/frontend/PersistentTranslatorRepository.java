package com.clouway.ta.adapter.frontend;

import com.google.appengine.api.datastore.Key;
import com.google.inject.Inject;
import com.vercer.engine.persist.ObjectDatastore;

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
  public String add(TranslatorEntity entity) {
    return String.valueOf(datastore.store(entity).getId());
  }


}
