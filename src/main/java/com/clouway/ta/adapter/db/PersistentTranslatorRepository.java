package com.clouway.ta.adapter.db;

import com.clouway.ta.adapter.frontend.Translator;
import com.google.api.client.util.Lists;

import java.util.Collections;
import java.util.List;

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
  }

  @Override
  public void edit(Translator translator) {
    ofy().save().entity(translator).now();
  }

  @Override
  public Translator getById(String translatorId) {
    Translator result = ofy().load().type(Translator.class).id(translatorId).now();
    return result;
  }

  @Override
  public List<Translator> getById(List<String> ids) {

    List<Translator> result = Lists.newArrayList();

    for (String each : ids){
      Translator entity = ofy().load().type(Translator.class).id(each).now();
      if (entity!=null){
        result.add(entity);
      }
    }

    return result;
  }

  @Override
  public void deleteById(String translatorId) {

  ofy().delete().type(Translator.class).id(translatorId).now();
  }

}
