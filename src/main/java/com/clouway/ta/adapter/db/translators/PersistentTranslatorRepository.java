package com.clouway.ta.adapter.db.translators;

import com.clouway.ta.core.TranslatorRepository;
import com.clouway.ta.adapter.frontend.Language;
import com.clouway.ta.adapter.frontend.Translator;
import com.google.common.collect.Lists;
import com.google.common.collect.Sets;

import java.util.List;
import java.util.Set;

import static com.clouway.ta.adapter.db.OfyService.ofy;

/**
 * Created by Panayot Kulchev on 15-10-14.
 * e-mail: panayotkulchev@gmail.com
 * happy codding ...
 */
public class PersistentTranslatorRepository implements TranslatorRepository {

  @Override
  public void add(Translator translator) {

    ofy().save().entity(translator).now();

    for (String each : translator.languages) {
      Language entity = ofy().load().type(Language.class).id(each).now();
      entity.translatorIds.add(translator.email);
      ofy().save().entity(entity).now();
    }

  }

  @Override
  public void edit(Translator newTranslator) {

    Translator oldTranslator = ofy().load().type(Translator.class).id(newTranslator.email).now();

    Set<String> languages = Sets.newHashSet(newTranslator.languages);
    languages.addAll(oldTranslator.languages);

    for (String each : languages){
      Language language  = ofy().load().type(Language.class).id(each).now();

      if (newTranslator.languages.contains(language.id)){
        if (!language.translatorIds.contains(newTranslator.email)){
          language.translatorIds.add(newTranslator.email);
        }
      }
      else{
        language.translatorIds.remove(language.translatorIds.indexOf(newTranslator.email));
      }
      ofy().save().entity(language).now();
    }

    oldTranslator.name = newTranslator.name;
    oldTranslator.currentAddress = newTranslator.currentAddress;
    oldTranslator.permanentAddress = newTranslator.permanentAddress;
    oldTranslator.phones = newTranslator.phones;
    oldTranslator.languages = newTranslator.languages;
    oldTranslator.skype = newTranslator.skype;
    oldTranslator.eid = newTranslator.eid;
    oldTranslator.document = newTranslator.document;
    oldTranslator.iban = newTranslator.iban;
    oldTranslator.favorite = newTranslator.favorite;
    oldTranslator.registered = newTranslator.registered;
    oldTranslator.comment = newTranslator.comment;

    ofy().save().entity(oldTranslator).now();
  }

  @Override
  public Translator getById(String translatorId) {
    Translator result = ofy().load().type(Translator.class).id(translatorId).now();
    return result;
  }

  @Override
  public List<Translator> getById(List<String> ids) {

    List<Translator> result = Lists.newArrayList();

    for (String each : ids) {
      Translator entity = ofy().load().type(Translator.class).id(each).now();
      if (entity != null) {
        result.add(entity);
      }
    }

    return result;
  }

  @Override
  public void deleteById(String translatorId) {

    Translator translator = ofy().load().type(Translator.class).id(translatorId).now();

    for (String languageId : translator.languages) {
      Language entity = ofy().load().type(Language.class).id(languageId).now();
      int index = entity.translatorIds.indexOf(translatorId);
      if (index != -1) {
        entity.translatorIds.remove(index);
        ofy().save().entity(entity).now();
      }
    }

    ofy().delete().type(Translator.class).id(translatorId).now();
  }

  @Override
  public List<Translator> getFavorites() {
   return ofy().load().type(Translator.class).filter("favorite", true).limit(20).list();
  }

}
