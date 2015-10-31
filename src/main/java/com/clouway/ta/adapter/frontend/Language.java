package com.clouway.ta.adapter.frontend;

import com.google.common.collect.Lists;
import com.vercer.engine.persist.annotation.Key;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Panayot Kulchev on 15-10-19.
 * e-mail: panayotkulchev@gmail.com
 * happy codding ...
 */
public class Language {

  @Key
  public String langId;
  public List<String> translatorIds = Lists.newArrayList();

  @SuppressWarnings("unchecked")
  public Language() {
    System.out.println("constructor language");
    System.out.println(translatorIds);
    translatorIds = Lists.newArrayList();
  }

  @Override
  public String toString() {
    return "LanguageEntity{" +
            "lang_id='" + langId + '\'' +
            ", translatorIds=" + translatorIds +
            '}';
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;

    Language language = (Language) o;

    if (langId != null ? !langId.equals(language.langId) : language.langId != null) return false;
    if (translatorIds != null ? !translatorIds.equals(language.translatorIds) : language.translatorIds != null)
      return false;

    return true;
  }

  @Override
  public int hashCode() {
    int result = langId != null ? langId.hashCode() : 0;
    result = 31 * result + (translatorIds != null ? translatorIds.hashCode() : 0);
    return result;
  }
}

