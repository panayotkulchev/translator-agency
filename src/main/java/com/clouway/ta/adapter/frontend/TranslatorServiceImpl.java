package com.clouway.ta.adapter.frontend;

import com.clouway.ta.adapter.db.LanguageRepository;
import com.clouway.ta.adapter.db.TranslatorRepository;
import com.google.api.client.util.Lists;
import com.google.inject.Inject;

import java.util.List;

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
  public void add(Translator translator) {

    translatorRepository.add(translator);

    languageRepository.mapUserId(translator.languages, translator.email);
  }

  @Override
  public List<Translator> getAll() {
    return null;
  }

  @Override
  public List<Translator> getByLanguages(List<String> langIds) {

    List<Translator> result = Lists.newArrayList();

    return result;
  }
}
