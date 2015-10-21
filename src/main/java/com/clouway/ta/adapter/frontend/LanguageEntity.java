package com.clouway.ta.adapter.frontend;

import com.vercer.engine.persist.annotation.Key;

import java.util.Set;

/**
 * Created by Panayot Kulchev on 15-10-19.
 * e-mail: panayotkulchev@gmail.com
 * happy codding ...
 */
public class LanguageEntity {

  @Key
  public String id;
  private Set<Long> translatorIds;

  public LanguageEntity() {
  }

  public LanguageEntity(String id) {
    this.id = id;
  }

  public Set<Long> getTranslatorIds() {
    return translatorIds;
  }

  public void setTranslatorIds(Set<Long> translaorIds) {
    this.translatorIds = translaorIds;
  }
}
