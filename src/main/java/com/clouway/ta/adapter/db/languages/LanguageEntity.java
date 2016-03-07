package com.clouway.ta.adapter.db.languages;

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
public class LanguageEntity {

  @Id
  public String id;
  @Index
  public List<String> translatorIds = new ArrayList<>();
  @Index
  public boolean isActive;

  @SuppressWarnings("unchecked")
  public LanguageEntity() {
  }

  public LanguageEntity(String id, boolean isActive) {
    this.id = id;
    this.isActive = isActive;
  }

  @Override
  public String toString() {
    return "LanguageEntity{" +
            "lang_id='" + id + '\'' +
            ", translatorIds=" + translatorIds +
            '}';
  }
}

