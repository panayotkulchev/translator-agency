package com.clouway.ta.adapter.frontend;

/**
 * Created by Panayot Kulchev on 15-11-16.
 * e-mail: panayotkulchev@gmail.com
 * happy codding ...
 */
public class LanguageDto {

  public String id;
  public Boolean isActive;

  public LanguageDto() {
  }

  @Override
  public String toString() {
    return "LanguageDto{" +
            "id='" + id + '\'' +
            ", isActive=" + isActive +
            '}';
  }
}
