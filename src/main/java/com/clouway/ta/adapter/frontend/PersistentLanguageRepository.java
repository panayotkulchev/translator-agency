package com.clouway.ta.adapter.frontend;

import com.google.common.collect.Sets;
import com.google.inject.Inject;
import com.vercer.engine.persist.ObjectDatastore;

import java.util.Set;

/**
 * Created by Panayot Kulchev on 15-10-19.
 * e-mail: panayotkulchev@gmail.com
 * happy codding ...
 */
public class PersistentLanguageRepository implements LanguageRepository {

  private ObjectDatastore datastore;

  @Inject
  public PersistentLanguageRepository(ObjectDatastore datastore) {
    this.datastore = datastore;
  }

  @Override
  public void add(String id) {

    LanguageEntity languageEntity = new LanguageEntity();
    languageEntity.langId = id;

    datastore.store(languageEntity);
  }

  @Override
  public void mapUserId(String langId, Long userId) {

    LanguageEntity entity = datastore.load(LanguageEntity.class, langId);
    System.out.println(entity);
    entity.translatorIds.add(userId);

    datastore.update(entity);

  }

  @Override
  public void delete(String langId) {

    LanguageEntity entity = datastore.load(LanguageEntity.class, langId);

    datastore.delete(entity);
  }

  @Override
  public Set<Long> getUserIds(Set<String> langIds) {

    Set<Long> translatorIds = Sets.newHashSet();
    System.out.println(langIds);
    for (String each : langIds){
      System.out.println(each);
      LanguageEntity entity = datastore.load(LanguageEntity.class, each);
//      datastore.load(TranslatorEntity.class,4609152743636992l);
//      LanguageEntity entity = datastore.load(LanguageEntity.class, "english");
      System.out.println(entity);
      for(Long id : entity.translatorIds){
        translatorIds.add(id);
      }
    }

      return translatorIds;
  }
}
