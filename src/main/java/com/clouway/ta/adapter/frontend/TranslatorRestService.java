package com.clouway.ta.adapter.frontend;

import com.google.inject.Inject;
import com.google.sitebricks.At;
import com.google.sitebricks.client.transport.Json;
import com.google.sitebricks.headless.Reply;
import com.google.sitebricks.headless.Request;
import com.google.sitebricks.headless.Service;
import com.google.sitebricks.http.Get;
import com.google.sitebricks.http.Post;

/**
 * Created by Panayot Kulchev on 15-10-14.
 * e-mail: panayotkulchev@gmail.com
 * happy codding ...
 */

@Service
public class TranslatorRestService {

  private final TranslatorService service;

  @Inject
  public TranslatorRestService(TranslatorService service) {
    this.service=service;
  }

  @Get
  public Reply<?> get(Request request){
    System.out.println("GET");
    return Reply.saying().ok();
  }

  @Post
  public Reply<?> add(Request request) {

    final TranslatorDto dto = request.read(TranslatorDto.class).as(Json.class);
    System.out.println(dto);
    final TranslatorDo translator = dtoToDo(dto);

    service.add(translator);

    return Reply.saying().ok();
  }


  private TranslatorDo dtoToDo(TranslatorDto dto) {
    return new TranslatorDo(dto.name, dto.currentAddress, dto.permanentAddress, dto.phones,
            dto.languages, dto.educations, dto.email, dto.skype, dto.eid, dto.document, dto.iban);
  }
}
