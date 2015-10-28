package com.clouway.ta.adapter.frontend;

import com.google.common.collect.Sets;
import com.google.inject.Inject;
import com.google.sitebricks.At;
import com.google.sitebricks.client.transport.Json;
import com.google.sitebricks.headless.Reply;
import com.google.sitebricks.headless.Request;
import com.google.sitebricks.headless.Service;
import com.google.sitebricks.http.Post;

import java.util.List;
import java.util.Set;

/**
 * Created by Panayot Kulchev on 15-10-14.
 * e-mail: panayotkulchev@gmail.com
 * happy codding ...
 */

@At("/r/translators")
@Service
public class TranslatorRestService {

  private final TranslatorService service;

  @Inject
  public TranslatorRestService(TranslatorService service) {
    this.service = service;
  }

  @At("/getByLanguages")
  @Post
  public Reply<?> getByLanguages(Request request) {

    Set languages = request.read(Set.class).as(Json.class);

    Set<TranslatorDo> translators = service.getByLanguages(languages);

    return Reply.with(translators).as(Json.class);
  }

  @At("/add")
  @Post
  public Reply<?> add(Request request) {

    final TranslatorDto dto = request.read(TranslatorDto.class).as(Json.class);

    final TranslatorDo translator = from(dto);

    service.add(translator);

    return Reply.saying().ok();
  }


  private TranslatorDo from(TranslatorDto dto) {
    return new TranslatorDo(dto.name, dto.currentAddress, dto.permanentAddress, dto.phones,
            dto.languages, dto.educations, dto.email, dto.skype, dto.eid, dto.document, dto.iban);
  }

  private Set<TranslatorDto> from(Set<TranslatorDo> dos){
    Set<TranslatorDto> dtos = Sets.newHashSet();
    for (TranslatorDo each: dos){
      dtos.add(from(each));
    }
    return dtos;
  }

  private TranslatorDto from(TranslatorDo aDo){
    return new TranslatorDto(aDo.name, aDo.currentAddress, aDo.permanentAddress, aDo.phones,
            aDo.languages, aDo.educations, aDo.email, aDo.skype, aDo.eid, aDo.document, aDo.iban);
  }
}
