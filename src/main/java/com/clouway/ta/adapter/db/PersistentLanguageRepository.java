package com.clouway.ta.adapter.db;

import com.clouway.ta.adapter.frontend.Language;
import com.google.api.client.util.Lists;
import com.google.api.client.util.Sets;

import java.util.List;
import java.util.Set;

import static com.clouway.ta.adapter.db.OfyService.ofy;


/**
 * Created by Panayot Kulchev on 15-10-19.
 * e-mail: panayotkulchev@gmail.com
 * happy codding ...
 */
public class PersistentLanguageRepository implements LanguageRepository {

//  private ObjectDatastore datastore;
//
//  @Inject
//  public PersistentLanguageRepository(ObjectDatastore datastore) {
//    this.datastore = datastore;
//  }

  @Override
  public void add(String id) {

    Language language = new Language();
    language.setLangId(id);
    ofy().save().entity(language).now();
  }

  @Override
  public void mapUserId(String language, String userId) {
    Language entity = ofy().load().type(Language.class).id(language).now();
    entity.translatorIds.add(userId);
    ofy().save().entity(entity).now();
  }

  @Override
  public void mapUserId(List<String> languages, String userId) {
    for (String each : languages){
      Language entity = ofy().load().type(Language.class).id(each).now();
      entity.translatorIds.add(userId);
      ofy().save().entity(entity).now();
    }
  }

  @Override
  public void delete(String langId) {

  }

  @Override
  public List<String> getUserIds(List<String> languages) {

    Set<String> result = Sets.newHashSet();

    for (String each: languages){
      Language language = ofy().load().type(Language.class).id(each).now();
      result.addAll(language.translatorIds);
    }

    return Lists.newArrayList(result);
  }


//  @Override
//  public void mapUserId(String langId, String userId) {
//
//    Language entity = datastore.load(Language.class, langId);
//    System.out.println(entity);
//    entity.translatorIds.add(userId);
//
//    datastore.update(entity);
//
//  }
//
//  @Override
//  public void mapUserId(List<String> languages, String userId) {
//
//    for (String each : languages) {
//      Language language = datastore.load(Language.class, each);
//      System.out.println(language);
//      if (language.translatorIds == null) {
//        language.translatorIds = Lists.newArrayList();
//      }
//      language.translatorIds.add(userId);
//      datastore.update(language);
//    }
//  }
//
//  @Override
//  public void delete(String langId) {
//
//    Language entity = datastore.load(Language.class, langId);
//
//    datastore.delete(entity);
//  }
//
//  @Override
//  public List<Long> getUserIds(List<String> langIds) {
//
//    List result = Lists.newArrayList();
//
//
//    return result;
//  }
}
