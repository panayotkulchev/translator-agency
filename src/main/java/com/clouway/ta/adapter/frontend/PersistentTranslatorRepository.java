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
  public Long add(TranslatorDo entity) {
    return datastore.store(entity).getId();
  }

  @Override
  public TranslatorDo getById(Long translatorId) {

    return from(datastore.load(TranslatorEntity.class, translatorId));
  }

  private TranslatorDo from(TranslatorEntity entity) {
    return new TranslatorDo(entity.name, entity.currentAddress, entity.permanentAddress, entity.phones, entity.languages, entity.educations, entity.email, entity.skype, entity.eid, entity.document, entity.iban);
  }


}
