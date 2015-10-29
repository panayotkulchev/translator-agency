package com.clouway.ta.adapter.frontend;

import com.google.common.collect.Sets;
import com.google.inject.Inject;

import java.util.Set;

/**
 * Created by Panayot Kulchev on 15-10-19.
 * e-mail: panayotkulchev@gmail.com
 * happy codding ...
 */
public class TranslatorServiceImpl implements TranslatorService {


  private final TranslatorRepository translatorRepository;
  private final LanguageRepository languageRepository;

  @Inject
  public TranslatorServiceImpl(TranslatorRepository translatorRepository,
                               LanguageRepository languageRepository) {
    this.translatorRepository = translatorRepository;
    this.languageRepository = languageRepository;
  }

  @Override
  public void add(TranslatorDo translator) {
    System.out.println("add user " + translator);
    final Long key = translatorRepository.add(translator);
    System.out.println(key);
    for (String each : translator.languages) {
//      languageRepository.add(each);
      System.out.println(each);
      languageRepository.mapUserId(each, key);
    }
  }

  @Override
  public Set<TranslatorDo> getAll() {
    return null;
  }

  @Override
  public Set<TranslatorDo> getByLanguages(Set<String> langIds) {

    Set<TranslatorDo> translators = Sets.newHashSet();

    final Set<Long> userIds = languageRepository.getUserIds(langIds);

    for (Long each : userIds) {
      TranslatorDo translator = translatorRepository.getById(each);
      translators.add(translator);
    }
    return translators;
  }
}
