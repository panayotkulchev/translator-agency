package com.clouway.ta.core.translators;

import com.clouway.ta.core.translators.Translator;

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

  List<Translator> getFavorites();

  void deleteById(String translatorId);

  List<Translator> getAllWith(List<String> languages);

  void changeAvatar (String translatorId, String avatar);
}
