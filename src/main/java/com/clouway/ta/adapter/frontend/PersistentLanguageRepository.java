package com.clouway.ta.adapter.frontend;

import com.google.common.collect.Lists;
import com.google.common.collect.Sets;
import com.google.inject.Inject;
import com.vercer.engine.persist.ObjectDatastore;

import java.util.List;
import java.util.Set;

/**
 * Created by Panayot Kulchev on 15-10-19.
 * e-mail: panayotkulchev@gmail.com
 * happy codding ...
 */
public class PersistentLanguageRepository implements LanguageRepository{

  private ObjectDatastore datastore;

  @Inject
  public PersistentLanguageRepository(ObjectDatastore datastore) {
    this.datastore = datastore;
  }

  @Override
  public void add(String id) {
  final LanguageEntity languageEntity = new LanguageEntity(id);
    datastore.store(languageEntity);
  }

  @Override
  public void mapUserId(String language, Long userId) {

    LanguageEntity entity = datastore.load(LanguageEntity.class, language);
    if(entity!=null){
      entity.getTranslatorIds().add(userId);
      datastore.update(entity);
      return;
    }

    entity= new LanguageEntity();

    Set<Long> ids = Sets.newHashSet(userId);
    entity.setTranslatorIds(ids);
    datastore.store(entity);



  }

  @Override
  public void delete() {

  }
}
