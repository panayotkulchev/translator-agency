package com.clouway.ta.core.languages;

/**
 * Created by Panayot Kulchev on 16-3-7.
 * e-mail: panayotkulchev@gmail.com
 * happy codding ...
 */
public class Language {

  public final String id;
  public final Boolean isActive;

  public Language(String id, Boolean isActive) {
    this.id = id;
    this.isActive = isActive;
  }
}
