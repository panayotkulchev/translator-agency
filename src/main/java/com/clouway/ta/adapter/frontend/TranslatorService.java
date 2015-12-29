package com.clouway.ta.adapter.frontend;

import java.util.List;

/**
 * Created by Panayot Kulchev on 15-10-19.
 * e-mail: panayotkulchev@gmail.com
 * happy codding ...
 */
public interface TranslatorService {

  void add(Translator translator);

  List<Translator> getAll();

  List<Translator> getByLanguages(List<String> languages);

  void delete(String translatorId);

  Translator getByEmail(String email);
}
