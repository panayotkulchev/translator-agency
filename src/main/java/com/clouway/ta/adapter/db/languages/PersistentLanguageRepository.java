package com.clouway.ta.adapter.db.languages;

import com.clouway.ta.core.LanguageRepository;
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
    language.setId(id);
    language.isActive = false;
    ofy().save().entity(language).now();
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
  public List<Language> getAll() {

    return ofy().load().type(Language.class).list();
  }

  @Override
  public void changeStatus(String id, Boolean isActive) {
    Language entity = ofy().load().type(Language.class).id(id).now();
    entity.isActive = isActive;
    ofy().save().entity(entity).now();
  }

}
