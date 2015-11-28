package com.clouway.ta.adapter.frontend;

import com.clouway.ta.adapter.db.LanguageRepository;
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
    List<String> langs = repository.getAll();
    return Reply.with(langs).as(Json.class);
  }

  @At("/withStatus")
  @Get
  public Reply<?> getAllWithStatus() {
    List<Language> langs = repository.getAllWithStatus();
    return Reply.with(langs).as(Json.class);
  }

  @At("/active")
  @Get
  public Reply<?> getAllActive() {
    List<Language> langs = repository.getAllWithStatus();
    List<String> actives = Lists.newArrayList();
    for (Language each : langs){
      if (each.isActive){
        actives.add(each.langId);
      }
    }
    return Reply.with(actives).as(Json.class);
  }




  @Post
  public Reply<?> add(Request request) {

    String lang = request.param("lang");
    repository.add(lang);

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
    System.out.println(id);

    return Reply.saying().ok();
  }
}
