package com.clouway.ta.core;

import com.clouway.ta.adapter.frontend.Translator;

import java.util.List;

/**
 * Created by Panayot Kulchev on 15-10-14.
 * e-mail: panayotkulchev@gmail.com
 * happy codding ...
 */
public interface TranslatorRepository {

  void add(Translator translator);

  void edit(Translator translator);

  Translator getById(String translatorId);

  List<Translator> getById(List<String> ids);

  void deleteById(String translatorId);

  List<Translator> getFavorites();
}