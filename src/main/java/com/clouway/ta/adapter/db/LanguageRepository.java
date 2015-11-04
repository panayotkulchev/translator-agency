package com.clouway.ta.adapter.db;

import java.util.List;

/**
 * Created by Panayot Kulchev on 15-10-19.
 * e-mail: panayotkulchev@gmail.com
 * happy codding ...
 */
public interface LanguageRepository {

  void add(String id);

  void mapUserId(String language, String userId);

  void mapUserId(List<String> languages, String userId);

  void delete(String langId);

  List<String> getUserIds(List<String> langId);
}
