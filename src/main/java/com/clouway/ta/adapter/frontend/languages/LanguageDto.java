package com.clouway.ta.adapter.frontend.languages;

/**
 * Created by Panayot Kulchev on 15-11-16.
 * e-mail: panayotkulchev@gmail.com
 * happy codding ...
 */
class LanguageDto {

  public String id;
  public Boolean isActive;

  @SuppressWarnings("unused")
  public LanguageDto() {
  }

  public LanguageDto(String id, Boolean isActive) {
    this.id = id;
    this.isActive = isActive;
  }

  @Override
  public String toString() {
    return "LanguageDto{" +
            "id='" + id + '\'' +
            ", isActive=" + isActive +
            '}';
  }
}
