package com.clouway.ta.adapter.frontend;

import com.clouway.ta.adapter.db.ClientRepository;
import com.google.inject.Inject;
import com.google.inject.name.Named;
import com.google.sitebricks.At;
import com.google.sitebricks.client.transport.Json;
import com.google.sitebricks.headless.Reply;
import com.google.sitebricks.headless.Request;
import com.google.sitebricks.headless.Service;
import com.google.sitebricks.http.Delete;
import com.google.sitebricks.http.Get;
import com.google.sitebricks.http.Post;
import com.google.sitebricks.http.Put;

import java.util.List;

/**
 * Created by Panayot Kulchev on 16-2-3.
 * e-mail: panayotkulchev@gmail.com
 * happy codding ...
 */

@Service
@At("/r/clients")
public class ClientsRestService {

  private final ClientRepository clientRepository;

  @Inject
  public ClientsRestService(ClientRepository clientRepository) {
    this.clientRepository = clientRepository;
  }

  @Get
  public Reply getAll(){

    List<Client> clients = clientRepository.getAll();

    return Reply.with(clients).as(Json.class);
  }

  @Post
  public Reply add(Request request){

    Client client = request.read(Client.class).as(Json.class);

    clientRepository.add(client);

    return Reply.saying().ok();
  }

  @Put
  public Reply update (Request request){

    Client client = request.read(Client.class).as(Json.class);

    clientRepository.update(client);
    System.out.println(client);

    return Reply.saying().ok();
  }
  @At("/:clientId")
  @Delete
  public Reply delete(@Named("clientId") Long clientId){

    clientRepository.delete(clientId);

    return Reply.saying().ok();
  }

}
