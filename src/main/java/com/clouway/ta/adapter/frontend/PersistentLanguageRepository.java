package com.clouway.ta.adapter.frontend;

import com.google.inject.Inject;
import com.vercer.engine.persist.ObjectDatastore;

import java.util.ArrayList;
import java.util.HashSet;

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
    final LanguageEntity languageEntity = new LanguageEntity(id, new ArrayList<Long>());
    datastore.store(languageEntity);
  }

  @Override
  public void mapUserId(String language, Long userId) {
//    Set<Long> t = new HashSet<Long>();
//    datastore.store(new LanguageEntity(language, t));

//    final LanguageEntity languageEntity = new LanguageEntity(language, new ArrayList<Long>());
//    datastore.store(languageEntity);
//    System.out.println(languageEntity);

    LanguageEntity entity = datastore.load(LanguageEntity.class, language);

    System.out.println("There is entity:" + language);
    System.out.println(entity);
    entity.translatorIds.add(userId);
    System.out.println(entity);
//    datastore.update(entity);

  }

  @Override
  public void delete() {

  }
}
