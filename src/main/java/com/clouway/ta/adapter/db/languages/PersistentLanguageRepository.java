package com.clouway.ta.adapter.db.languages;

import com.clouway.ta.core.languages.Language;
import com.clouway.ta.core.languages.LanguageRepository;
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
  public void add(Language language) {

    LanguageEntity languageEntity = new LanguageEntity(language.id, language.isActive);

    ofy().save().entity(languageEntity).now();
  }

  @Override
  public void delete(String id) {

    LanguageEntity languageEntity = ofy().load().type(LanguageEntity.class).id(id).now();

    if (languageEntity.translatorIds.isEmpty()) {
      ofy().delete().type(LanguageEntity.class).id(id).now();
    } else {
      //TODO (panayotkulchev) throw ApplicationException
    }
  }

  @Override
  public List<String> getTranslatorIds(List<String> languages) {

    Set<String> result = Sets.newHashSet();

    for (String each : languages) {
      LanguageEntity languageEntity = ofy().load().type(LanguageEntity.class).id(each).now();
      result.addAll(languageEntity.translatorIds);
    }

    return Lists.newArrayList(result);
  }

  @Override
  public List<Language> getAll() {

    List<LanguageEntity> entities = ofy().load().type(LanguageEntity.class).list();

    return adapt(entities);
  }

  @Override
  public List<String> getActive() {

    List<LanguageEntity> entities = ofy().load().type(LanguageEntity.class).filter("isActive", true).list();

    List<String> languageIds = Lists.newArrayList();

    for (LanguageEntity entity: entities){
      languageIds.add(entity.id);
    }

    return languageIds;
  }

  @Override
  public void changeStatus(String id, Boolean isActive) {

    LanguageEntity entity = ofy().load().type(LanguageEntity.class).id(id).now();

    entity.isActive = isActive;

    ofy().save().entity(entity).now();
  }


  private Language adapt(LanguageEntity entity) {
    return new Language(entity.id, entity.isActive);
  }

  private List<Language> adapt(List<LanguageEntity> entities) {
    List<Language> languages = Lists.newArrayList();

    for (LanguageEntity entity : entities) {
      languages.add(adapt(entity));
    }
    return languages;
  }
}
