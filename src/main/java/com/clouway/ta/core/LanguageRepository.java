package com.clouway.ta.core;

import com.clouway.ta.adapter.frontend.Language;

import java.util.List;

/**
 * Created by Panayot Kulchev on 15-10-19.
 * e-mail: panayotkulchev@gmail.com
 * happy codding ...
 */
public interface LanguageRepository {

  void add(String id);

  void delete(String id);

  List<String> getUserIds(List<String> langId);

  List<Language> getAll();

  void changeStatus(String id, Boolean isActive);
}
