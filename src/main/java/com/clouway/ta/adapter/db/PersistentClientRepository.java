package com.clouway.ta.adapter.db;

import com.clouway.ta.adapter.frontend.Client;
import com.clouway.ta.core.IndexWriter;

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

    Client oldClient = ofy().load().type(Client.class).id(client.id).now();

    oldClient.name = client.name;
    oldClient.eik = client.eik;
    oldClient.dds = client.dds;
    oldClient.address = client.address;
    oldClient.mol = client.mol;
    oldClient.phone = client.phone;
    oldClient.searchIndex = IndexWriter.createIndex(client.name);
    oldClient.searchIndex.add(client.eik);

    ofy().save().entity(oldClient).now();

  }

  @Override
  public void get(Long id) {

  }

  @Override
  public List<Client> getAll() {
    return ofy().load().type(Client.class).list();
  }

  @Override
  public List<Client> search(String query) {
    return ofy().load().type(Client.class).filter("searchIndex", query).list();
  }

  @Override
  public void delete(Long id) {
    ofy().delete().type(Client.class).id(id).now();
  }
}
