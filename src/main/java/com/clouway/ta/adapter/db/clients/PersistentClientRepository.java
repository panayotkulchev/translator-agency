package com.clouway.ta.adapter.db.clients;

import com.clouway.ta.core.clients.Client;
import com.clouway.ta.core.clients.ClientRepository;
import com.google.api.client.util.Lists;
import com.google.api.client.util.Sets;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import static com.clouway.ta.adapter.db.OfyService.ofy;
import static com.clouway.ta.adapter.db.clients.ClientEntity.newClientEntity;
import static com.clouway.ta.core.clients.Client.newClient;

/**
 * Created by Panayot Kulchev on 16-2-3.
 * e-mail: panayotkulchev@gmail.com
 * happy codding ...
 */
public class PersistentClientRepository implements ClientRepository {
  @Override
  public Long add(Client client) {

    ClientEntity clientEntity = adapt(client);

    clientEntity.createSearchIndex();

    ofy().save().entity(clientEntity).now();

    return clientEntity.getId();
  }


  @Override
  public void update(Client client) {

    ClientEntity clientEntity = ofy().load().type(ClientEntity.class).id(client.id).now();

    String oldName = clientEntity.getName();

    clientEntity.setName(client.name);
    clientEntity.setEik(client.eik);
    clientEntity.setDds(client.dds);
    clientEntity.setAddress(client.address);
    clientEntity.setMol(client.mol);
    clientEntity.setPhone(client.phone);

    if (!oldName.equals(client.name)){
      clientEntity.createSearchIndex();
    }

    ofy().save().entity(clientEntity).now();

  }

  @Override
  public void get(Long id) {

  }

  @Override
  public List<Client> getAll() {
    List<ClientEntity> entities = ofy().load().type(ClientEntity.class).list();
    return adapt(entities);
  }

  @Override
  public List<Client> search(String query) {
    Set<ClientEntity> result = Sets.newHashSet();

    query = query.toLowerCase();
    query = query.replace("\"|\'|-", "");

    List<ClientEntity> searchIndexResults = ofy().load().type(ClientEntity.class).filter("searchIndex", query).list();
    List<ClientEntity> eikResults = ofy().load().type(ClientEntity.class).filter("eik", query).list();

    result.addAll(searchIndexResults);
    result.addAll(eikResults);

    ArrayList<ClientEntity> clients = Lists.newArrayList(result);

    return adapt(clients);
  }

  @Override
  public void delete(Long id) {
    ofy().delete().type(ClientEntity.class).id(id).now();
  }

  private ClientEntity adapt(Client client) {
    return newClientEntity()
            .name(client.name)
            .eik(client.eik)
            .dds(client.dds)
            .address(client.address)
            .mol(client.mol)
            .phone(client.phone)
            .build();
  }

  private List<Client> adapt(List<ClientEntity> entities) {
    List<Client> clients = Lists.newArrayList();

    for(ClientEntity entity: entities){
      clients.add(adapt(entity));
    }
    return clients;
  }

  private Client adapt(ClientEntity entity) {
    return newClient()
            .id(entity.getId())
            .name(entity.getName())
            .eik(entity.getEik())
            .dds(entity.getDds())
            .address(entity.getAddress())
            .mol(entity.getMol())
            .phone(entity.getPhone())
            .build();
  }
}
