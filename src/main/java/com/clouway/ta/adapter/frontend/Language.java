package com.clouway.ta.adapter.frontend;

import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Index;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Panayot Kulchev on 15-10-19.
 * e-mail: panayotkulchev@gmail.com
 * happy codding ...
 */
@Entity
public class Language {

  @Id
  public String langId;
  @Index
  public List<String> translatorIds = new ArrayList<>();

  @SuppressWarnings("unchecked")
  public Language() {
  }

  public void setLangId(String langId) {
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

