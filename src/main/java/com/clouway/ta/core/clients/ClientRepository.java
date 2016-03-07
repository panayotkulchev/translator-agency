package com.clouway.ta.core.clients;

import com.clouway.ta.core.clients.Client;

import java.util.List;

/**
 * Created by Panayot Kulchev on 16-2-3.
 * e-mail: panayotkulchev@gmail.com
 * happy codding ...
 */
public interface ClientRepository {

  Long add(Client client);

  void update(Client client);

  void get(Long id);

  List<Client> getAll();

  List<Client> search(String query);

  void delete(Long id);

}
