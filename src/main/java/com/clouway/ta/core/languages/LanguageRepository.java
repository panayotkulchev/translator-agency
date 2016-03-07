package com.clouway.ta.core.languages;

import java.util.List;

/**
 * Created by Panayot Kulchev on 15-10-19.
 * e-mail: panayotkulchev@gmail.com
 * happy codding ...
 */
public interface LanguageRepository {

  void add(Language language);

  void changeStatus(String id, Boolean isActive);

  void delete(String id);

  List<Language> getAll();

  List<String> getActive();

  List<String> getTranslatorIds(List<String> langId);
}
