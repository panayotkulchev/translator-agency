package com.clouway.ta.adapter.frontend;

/**
 * Created by Panayot Kulchev on 15-10-19.
 * e-mail: panayotkulchev@gmail.com
 * happy codding ...
 */
public interface LanguageRepository {

  void add(String id);

  void mapUserId(String language, Long userId);

  void delete();

}
