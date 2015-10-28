package com.clouway.ta.adapter.frontend;

/**
 * Created by Panayot Kulchev on 15-10-14.
 * e-mail: panayotkulchev@gmail.com
 * happy codding ...
 */
public interface TranslatorRepository {

  Long add(TranslatorDo translator);

  TranslatorDo getById(Long translatorId);
}
