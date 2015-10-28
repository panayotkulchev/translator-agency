package com.clouway.ta.adapter.frontend;

import java.util.Set;

/**
 * Created by Panayot Kulchev on 15-10-28.
 * e-mail: panayotkulchev@gmail.com
 * happy codding ...
 */
public class LanguagesDo {

  public final String langId;
  public final Set<Long> translatorIds;

  public LanguagesDo(String langId, Set<Long> translatorIds) {
    this.langId = langId;
    this.translatorIds = translatorIds;
  }
}
