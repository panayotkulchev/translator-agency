package com.clouway.ta.adapter.frontend;

import com.vercer.engine.persist.annotation.Key;

import java.util.List;

/**
 * Created by Panayot Kulchev on 15-10-19.
 * e-mail: panayotkulchev@gmail.com
 * happy codding ...
 */
public class LanguageEntity {

  @Key
  public String id;
  private List<Long> translaorIds;

  public LanguageEntity(String id) {
    this.id = id;
  }
}
