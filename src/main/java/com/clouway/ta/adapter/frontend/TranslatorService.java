package com.clouway.ta.adapter.frontend;

import java.util.Set;

/**
 * Created by Panayot Kulchev on 15-10-19.
 * e-mail: panayotkulchev@gmail.com
 * happy codding ...
 */
public interface TranslatorService {

  void add(TranslatorDo translator);

  Set<TranslatorDo> getAll();

  Set<TranslatorDo> getByLanguages(Set<String> languages);

}
