package com.clouway.ta.core.users;

import com.clouway.ta.core.examples.User;

/**
 * Created by Panayot Kulchev on 15-11-20.
 * e-mail: panayotkulchev@gmail.com
 * happy codding ...
 */
public interface UserRepository {

  void register(User user);

  void register(String email, String password);

  boolean authorize(String email, String password);

  boolean isExisting(String email);

  boolean isExist(String email);

  User get(String email);

  void edit(User user);
}
