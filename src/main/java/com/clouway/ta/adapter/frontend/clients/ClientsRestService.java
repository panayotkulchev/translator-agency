package com.clouway.ta.adapter.frontend.clients;

import com.clouway.ta.core.clients.Client;
import com.clouway.ta.core.clients.ClientRepository;
import com.google.api.client.util.Lists;
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

import static com.clouway.ta.adapter.frontend.clients.ClientDto.newClientDto;
import static com.clouway.ta.core.clients.Client.newClient;

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
  public Reply getAll() {

    List<Client> clients = clientRepository.getAll();

    List<ClientDto> dtos = adapt(clients);

    return Reply.with(dtos).as(Json.class);
  }

  @At("/search/filtered")
  @Get
  public Reply search(Request request) {

    String query = request.param("query");

    List<Client> clients = clientRepository.search(query);

    List<ClientDto> dtos = adapt(clients);

    return Reply.with(dtos).as(Json.class);
  }

  @Post
  public Reply add(Request request) {

    ClientDto clientDto = request.read(ClientDto.class).as(Json.class);

    Client client = adapt(clientDto);

    Long clientId = clientRepository.add(client);

    return Reply.with(clientId).as(Json.class);
  }

  @Put
  public Reply update(Request request) {

    ClientDto client = request.read(ClientDto.class).as(Json.class);

    Client clientUpdate = adapt(client);

    clientRepository.update(clientUpdate);

    return Reply.saying().ok();
  }

  @At("/:clientId")
  @Delete
  public Reply delete(@Named("clientId") Long clientId) {

    clientRepository.delete(clientId);

    return Reply.saying().ok();
  }

  private Client adapt(ClientDto clientDto) {
    return newClient()
            .id(clientDto.id)
            .name(clientDto.name)
            .eik(clientDto.eik)
            .dds(clientDto.dds)
            .address(clientDto.address)
            .mol(clientDto.mol)
            .phone(clientDto.phone)
            .build();
  }


  private List<ClientDto> adapt(List<Client> clients) {
    List<ClientDto> dtos = Lists.newArrayList();

    for (Client client: clients){
      dtos.add(adapt(client));
    }
    return dtos;
  }


  private ClientDto adapt(Client client) {
    return newClientDto()
            .id(client.id)
            .name(client.name)
            .eik(client.eik)
            .dds(client.dds)
            .address(client.address)
            .mol(client.mol)
            .phone(client.phone)
            .build();
  }
}
