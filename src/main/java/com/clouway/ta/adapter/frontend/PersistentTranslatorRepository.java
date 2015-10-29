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
  public Long add(TranslatorDo translator) {
    return datastore.store(from(translator)).getId();
  }

  @Override
  public TranslatorDo getById(Long translatorId) {

    return from(datastore.load(TranslatorEntity.class, translatorId));
  }

  private TranslatorDo from(TranslatorEntity entity) {
    return new TranslatorDo(entity.name, entity.currentAddress, entity.permanentAddress, entity.phones, entity.languages, entity.educations, entity.email, entity.skype, entity.eid, entity.document, entity.iban);
  }

  private TranslatorEntity from(TranslatorDo translator){
    return new TranslatorEntity(translator.name, translator.currentAddress, translator.permanentAddress, translator.phones, translator.languages, translator.educations, translator.email, translator.skype, translator.eid, translator.document, translator.iban);

  }


}
