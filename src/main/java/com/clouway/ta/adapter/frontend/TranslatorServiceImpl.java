package com.clouway.ta.adapter.frontend;

import com.google.inject.Inject;

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

    final Long key = translatorRepository.add(toEntity(translator));

    for (String each : translator.languages){
      languageRepository.mapUserId(each,key);
    }


  }

  private TranslatorEntity toEntity(TranslatorDo tdo) {
    return new TranslatorEntity(tdo.name,tdo.currentAddress,tdo.permanentAddress,tdo.phones,tdo.languages,tdo.educations,tdo.email,tdo.skype,tdo.eid,tdo.document,tdo.iban);
  }
}
