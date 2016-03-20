package com.clouway.ta.adapter.db.users;

import com.clouway.ta.core.users.UserRepository;
import com.clouway.ta.adapter.frontend.UserEntity;
import com.clouway.ta.core.examples.User;

import static com.clouway.ta.adapter.db.OfyService.ofy;

/**
 * Created by Panayot Kulchev on 15-11-20.
 * e-mail: panayotkulchev@gmail.com
 * happy codding ...
 */
public class PersistentUserRepository implements UserRepository {
  @Override
  public void register(User user) {

  }

  @Override
  public void register(String email, String password) {
    ofy().save().entity(new UserEntity(email,password)).now();
  }

  @Override
  public boolean authorize(String email, String password) {
    UserEntity user = ofy().load().type(UserEntity.class).id(email).now();
    return user != null && user.email.equals(email) && user.password.equals(password);

  }

    @Override
  public boolean isExisting(String email) {

    if (ofy().load().type(User.class).id(email).now()==null) {
      return false;
    }
    return true;
  }

  @Override
  public boolean isExist(String email) {
    UserEntity userEntity = ofy().load().type(UserEntity.class).id(email).now();
    return userEntity != null;
  }

  @Override
  public User get(String email) {
    return null;
  }

  @Override
  public void edit(User user) {

  }


//  @Override
//  public void register(String email, String password) {
//    User user = new User(email, password);
//    datastore.store(user);
//  }
//
//  @Override
//  public boolean isExisting(String email) {
//
//    if (datastore.load(User.class, email) == null) {
//      return false;
//    }
//    return true;
//  }
//

//
//  @Override
//  public CurrentUser getBySid(String sid) {
//
//    Session session = datastore.load(Session.class, sid);
//    User user = datastore.load(User.class, session.userId);
//
//    return new CurrentUser(user.email);
//  }
}

