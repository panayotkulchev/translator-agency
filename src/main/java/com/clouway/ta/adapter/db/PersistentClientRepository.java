package com.clouway.ta.adapter.db;

import com.clouway.ta.adapter.frontend.Client;

import java.util.List;

import static com.clouway.ta.adapter.db.OfyService.ofy;

/**
 * Created by Panayot Kulchev on 16-2-3.
 * e-mail: panayotkulchev@gmail.com
 * happy codding ...
 */
public class PersistentClientRepository implements ClientRepository {
  @Override
  public void add(Client client) {
    ofy().save().entity(client).now();
  }

  @Override
  public void update(Client client) {

//    Client oldCliient = ofy().load().type(Client.class).id(client.id).now();

  }

  @Override
  public void get(Long id) {

  }

  @Override
  public List<Client> getAll() {
    return ofy().load().type(Client.class).list();
  }

  @Override
  public void delete(Long id) {

  }
}
