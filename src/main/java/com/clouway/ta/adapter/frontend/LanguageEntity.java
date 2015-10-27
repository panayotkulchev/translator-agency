package com.clouway.ta.adapter.frontend;

import com.vercer.engine.persist.annotation.Embed;
import com.vercer.engine.persist.annotation.Key;

import java.util.List;
import java.util.Set;

/**
 * Created by Panayot Kulchev on 15-10-19.
 * e-mail: panayotkulchev@gmail.com
 * happy codding ...
 */
public class LanguageEntity {

  @Key
  public String lang_id;
  @Embed
  public List<Long> translatorIds;

  public LanguageEntity() {
  }

  public LanguageEntity(String lang_id, List<Long> translatorIds) {
    this.lang_id = lang_id;
    this.translatorIds = translatorIds;
  }

  @Override
  public String toString() {
    return "LanguageEntity{" +
            "lang_id='" + lang_id + '\'' +
            ", translatorIds=" + translatorIds +
            '}';
  }
}

