package com.clouway.ta.adapter.frontend;

import com.google.common.collect.Sets;
import com.vercer.engine.persist.annotation.Key;

import java.util.Set;

/**
 * Created by Panayot Kulchev on 15-10-19.
 * e-mail: panayotkulchev@gmail.com
 * happy codding ...
 */
public class LanguageEntity {

  @Key
  public String langId;
  public Set<Long> translatorIds = Sets.newHashSet();

  @SuppressWarnings("unchecked")
  public LanguageEntity() {
  }

  public LanguageEntity(String langId) {
    this.langId = langId;
  }

  @Override
  public String toString() {
    return "LanguageEntity{" +
            "lang_id='" + langId + '\'' +
            ", translatorIds=" + translatorIds +
            '}';
  }
}

