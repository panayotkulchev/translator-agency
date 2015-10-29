package com.clouway.ta.adapter.frontend;

import com.google.common.collect.Lists;
import com.google.common.collect.Sets;
import com.vercer.engine.persist.annotation.Key;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

/**
 * Created by Panayot Kulchev on 15-10-19.
 * e-mail: panayotkulchev@gmail.com
 * happy codding ...
 */
public class LanguageEntity {

  @Key
  public String langId;
  public List<Long> translatorIds = new ArrayList<Long>();

  @SuppressWarnings("unchecked")
  public LanguageEntity() {
    translatorIds = new ArrayList<Long>();
  }

//  public LanguageEntity(String langId) {
//    this.langId = langId;
//    this.translatorIds = Lists.newArrayList();
//  }

  public LanguageEntity(String langId, List<Long> translatorIds) {
    this.langId = langId;
    this.translatorIds = new ArrayList<Long>();
  }

  @Override
  public String toString() {
    return "LanguageEntity{" +
            "lang_id='" + langId + '\'' +
            ", translatorIds=" + translatorIds +
            '}';
  }
}

