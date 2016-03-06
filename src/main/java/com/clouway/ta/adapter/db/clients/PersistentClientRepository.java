package com.clouway.ta.adapter.db.clients;

import com.clouway.ta.core.ClientRepository;
import com.clouway.ta.adapter.frontend.Client;
import com.clouway.ta.adapter.db.IndexWriter;
import com.google.api.client.util.Lists;
import com.google.api.client.util.Sets;

import java.util.List;
import java.util.Set;

import static com.clouway.ta.adapter.db.OfyService.ofy;

/**
 * Created by Panayot Kulchev on 16-2-3.
 * e-mail: panayotkulchev@gmail.com
 * happy codding ...
 */
public class PersistentClientRepository implements ClientRepository {
  @Override
  public Long add(Client client) {

    client.createSearchIndex();

    ofy().save().entity(client).now();

    return client.id;
  }

  @Override
  public void update(Client client) {

    Client oldClient = ofy().load().type(Client.class).id(client.id).now();

    String oldName = oldClient.name;

    oldClient.name = client.name;
    oldClient.eik = client.eik;
    oldClient.dds = client.dds;
    oldClient.address = client.address;
    oldClient.mol = client.mol;
    oldClient.phone = client.phone;

    if (!oldName.equals(client.name)){
      oldClient.createSearchIndex();
    }

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
    Set<Client> result = Sets.newHashSet();

    query = query.toLowerCase();
    query = query.replace("\"|\'|-", "");

    List<Client> searchIndexResults = ofy().load().type(Client.class).filter("searchIndex", query).list();
    List<Client> eikResults = ofy().load().type(Client.class).filter("eik", query).list();

    result.addAll(searchIndexResults);
    result.addAll(eikResults);
    return Lists.newArrayList(result);
  }

  @Override
  public void delete(Long id) {
    ofy().delete().type(Client.class).id(id).now();
  }
}
