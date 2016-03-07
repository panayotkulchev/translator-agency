package com.clouway.ta.adapter.frontend.languages;

import com.clouway.ta.core.languages.Language;
import com.clouway.ta.core.languages.LanguageRepository;
import com.google.common.collect.Lists;
import com.google.inject.Inject;
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
 * Created by Panayot Kulchev on 15-11-7.
 * e-mail: panayotkulchev@gmail.com
 * happy codding ...
 */

@Service
@At("/r/languages")
public class LanguagesRestService {

  private LanguageRepository repository;

  @Inject
  public LanguagesRestService(LanguageRepository repository) {
    this.repository = repository;
  }

  @Get
  public Reply<?> getAll() {

    List<Language> languages = repository.getAll();

    List<LanguageDto> dtos = adapt(languages);

    return Reply.with(dtos).as(Json.class);
  }

  @At("/active")
  @Get
  public Reply<?> getActive() {

    List<String> languages = repository.getActive();

    return Reply.with(languages).as(Json.class);
  }

  @Post
  public Reply<?> add(Request request) {

    String languageName = request.param("lang");

    Language language = new Language(languageName, false);

    repository.add(language);

    return Reply.saying().ok();
  }

  @Put
  public Reply<?> edit(Request request) {

    LanguageDto dto = request.read(LanguageDto.class).as(Json.class);

    repository.changeStatus(dto.id, dto.isActive);

    return Reply.saying().ok();
  }

  @Delete
  public Reply<?> delete(Request request) {

    String id = request.param("id");

    repository.delete(id);

    return Reply.saying().ok();
  }


  private LanguageDto adapt(Language language) {
    return new LanguageDto(language.id, language.isActive);
  }


  private List<LanguageDto> adapt(List<Language> languages) {
    List<LanguageDto> dtos = Lists.newArrayList();

    for (Language language : languages) {
      dtos.add(adapt(language));
    }
    return dtos;
  }
}
