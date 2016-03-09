package com.clouway.ta.adapter.db.translators;

import com.clouway.ta.core.TranslatorRepository;
import com.clouway.ta.core.translators.Translator;
import com.google.common.collect.Lists;
import com.google.common.collect.Sets;

import java.util.List;
import java.util.Set;

import static com.clouway.ta.adapter.db.OfyService.ofy;
import static com.clouway.ta.adapter.db.translators.TranslatorEntity.newTranslatorEntity;
import static com.clouway.ta.core.translators.Translator.newTranslator;

/**
 * Created by Panayot Kulchev on 15-10-14.
 * e-mail: panayotkulchev@gmail.com
 * happy codding ...
 */
public class PersistentTranslatorRepository implements TranslatorRepository {

  @Override
  public void add(Translator translator) {

    TranslatorEntity entity = adapt(translator);

    ofy().save().entity(entity).now();
  }

  @Override
  public void edit(Translator translator) {

    TranslatorEntity entity = ofy().load().type(TranslatorEntity.class).id(translator.email).now();

    entity.setName(translator.name);
    entity.setCurrentAddress(translator.currentAddress);
    entity.setPermanentAddress(translator.permanentAddress);
    entity.setPhones(translator.phones);
    entity.setLanguages(translator.languages);
    entity.setSkype(translator.skype);
    entity.setEid(translator.eid);
    entity.setDocument(translator.document);
    entity.setIban(translator.iban);
    entity.setFavorite(translator.favorite);
    entity.setRegistered(translator.registered);
    entity.setComment(translator.comment);

    ofy().save().entity(entity).now();
  }

  @Override
  public Translator getById(String translatorId) {
    TranslatorEntity entity = ofy().load().type(TranslatorEntity.class).id(translatorId).now();
    return adapt(entity);
  }

  @Override
  public void deleteById(String translatorId) {
    ofy().delete().type(TranslatorEntity.class).id(translatorId).now();
  }

  @Override
  public List<Translator> getAllWith(List<String> languages) {
    Set<TranslatorEntity> translatorEntitySet = Sets.newHashSet();

    for (String language : languages) {
      List<TranslatorEntity> entities = ofy().load().type(TranslatorEntity.class).filter("languages", language).list();
      translatorEntitySet.addAll(entities);
    }

    List<Translator> translators = adapt(Lists.newArrayList(translatorEntitySet));

    return translators;
  }


  @Override
  public List<Translator> getFavorites() {
    List<TranslatorEntity> entities = ofy().load().type(TranslatorEntity.class).filter("favorite", true).limit(20).list();
    return adapt(entities);
  }


  //ADAPT METHODS
  private TranslatorEntity adapt(Translator translator) {
    return newTranslatorEntity()
            .email(translator.email)
            .name(translator.name)
            .currentAddress(translator.currentAddress)
            .permanentAddress(translator.permanentAddress)
            .phones(translator.phones)
            .languages(translator.languages)
            .skype(translator.skype)
            .eid(translator.eid)
            .document(translator.document)
            .iban(translator.iban)
            .favorite(translator.favorite)
            .registered(translator.registered)
            .comment(translator.comment)
            .build();
  }


  private Translator adapt(TranslatorEntity entity) {
    return newTranslator()
            .email(entity.getEmail())
            .name(entity.getName())
            .currentAddress(entity.getCurrentAddress())
            .permanentAddress(entity.getPermanentAddress())
            .phones(entity.getPhones())
            .languages(entity.getLanguages())
            .skype(entity.getSkype())
            .eid(entity.getEid())
            .document(entity.getDocument())
            .iban(entity.getIban())
            .favorite(entity.isFavorite())
            .registered(entity.isRegistered())
            .comment(entity.getComment())
            .build();
  }

  private List<Translator> adapt(List<TranslatorEntity> entities) {
    List<Translator> translators = Lists.newArrayList();

    for (TranslatorEntity entity : entities) {
      translators.add(adapt(entity));
    }
    return translators;
  }

}
