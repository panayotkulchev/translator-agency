package com.clouway.ta.adapter.frontend;

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
  public void add(TranslatorEntity entity) {

    datastore.store(entity);

  }


}
