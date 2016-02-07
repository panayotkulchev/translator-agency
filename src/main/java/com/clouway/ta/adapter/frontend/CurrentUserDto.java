package com.clouway.ta.adapter.frontend;

/**
 * Created by Panayot Kulchev on 16-2-6.
 * e-mail: panayotkulchev@gmail.com
 * happy codding ...
 */
class CurrentUserDto {
  public final String email;

  @SuppressWarnings("unused")
  public CurrentUserDto() {
    email = null;
  }

  public CurrentUserDto(String email) {
    this.email = email;
  }
}
