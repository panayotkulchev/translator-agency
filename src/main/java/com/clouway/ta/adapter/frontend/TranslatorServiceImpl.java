package com.clouway.ta.adapter.frontend;

import com.google.inject.Inject;

/**
 * Created by Panayot Kulchev on 15-10-19.
 * e-mail: panayotkulchev@gmail.com
 * happy codding ...
 */
public class TranslatorServiceImpl implements TranslatorService {


  private TranslatorRepository repository;

  @Inject
  public TranslatorServiceImpl(TranslatorRepository repository) {
    this.repository = repository;
  }

  @Override
  public void add(TranslatorDo translator) {



  }
}
