package com.clouway.ta.adapter.frontend;

import com.clouway.ta.adapter.db.LanguageRepository;
import com.clouway.ta.adapter.db.TranslatorRepository;
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
  public List<Translator> getByLanguages(List<String> languages) {
    System.out.println(languages);
    List<String> translatorIds = languageRepository.getUserIds(languages);
    System.out.println("users ids: "+ translatorIds);
    List<Translator> result = translatorRepository.getById(translatorIds);
    System.out.println(result);
    return result;
  }

  @Override
  public void delete(String translatorId) {

    translatorRepository.deleteById(translatorId);
  }
}
