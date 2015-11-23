package com.clouway.ta.adapter.db;

import com.clouway.ta.adapter.frontend.Language;
import com.google.common.collect.Lists;
import com.google.common.collect.Sets;

import java.util.List;
import java.util.Set;

import static com.clouway.ta.adapter.db.OfyService.ofy;


/**
 * Created by Panayot Kulchev on 15-10-19.
 * e-mail: panayotkulchev@gmail.com
 * happy codding ...
 */
public class PersistentLanguageRepository implements LanguageRepository {

  @Override
  public void add(String id) {

    Language language = new Language();
    language.setLangId(id);
    language.isActive = false;
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
  public void delete(String id) {
    ofy().delete().type(Language.class).id(id).now();
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


  @Override
  public List<String> getAll() {

    List<String> result = Lists.newArrayList();

    List<Language> langs = ofy().load().type(Language.class).list();

    for (Language each : langs){
        result.add(each.langId);
    }

    return result;
  }

  @Override
  public List<Language> getAllWithStatus() {

    List<Language> langs = ofy().load().type(Language.class).list();
    return langs;
  }

  @Override
  public void unMap(String language, String translatorId) {
    Language entity = ofy().load().type(Language.class).id(language).now();
    int index = entity.translatorIds.indexOf(translatorId);
    if (index!=-1){
      entity.translatorIds.remove(index);
      ofy().save().entity(entity).now();
    }
  }

  @Override
  public void changeStatus(String id, Boolean isActive) {
    Language entity = ofy().load().type(Language.class).id(id).now();
    entity.isActive = isActive;
    ofy().save().entity(entity).now();
  }

}
