package com.clouway.ta.adapter.frontend;

import com.clouway.ta.adapter.db.LanguageRepository;
import com.clouway.ta.adapter.db.TranslatorRepository;
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

import java.util.List;

/**
 * Created by Panayot Kulchev on 15-10-14.
 * e-mail: panayotkulchev@gmail.com
 * happy codding ...
 */

@At("/r/translators")
@Service
public class TranslatorRestService {

  private final TranslatorService service;
  private final TranslatorRepository translatorRepository;
  private final LanguageRepository languageRepository;

  @Inject
  public TranslatorRestService(TranslatorService service, TranslatorRepository translatorRepository, LanguageRepository languageRepository) {
    this.service = service;
    this.translatorRepository = translatorRepository;
    this.languageRepository = languageRepository;
  }

  @Get
  public Reply<?> getByEmail(Request request) {

    String email = request.param("email");

    Translator translator = translatorRepository.getById(email);
    System.out.println(translator);
    return Reply.with(translator).as(Json.class);

  }

  @At("/getByLanguages")
  @Post
  public Reply<?> getByLanguages(Request request) {

    List languages = request.read(List.class).as(Json.class);

    List<Translator> translators = service.getByLanguages(languages);

    //todo fix this
    for (Translator each: translators){
      each.createLanguageLine();
    }

    return Reply.with(translators).as(Json.class);
  }

  @At("/add")
  @Post
  public Reply<?> add(Request request) {

    Translator translator = request.read(Translator.class).as(Json.class);

    service.add(translator);

    return Reply.saying().ok();
  }

  @At("/delete")
  @Delete
  public Reply<?> delete(Request request) {

    String translatorId = request.param("id");

    service.delete(translatorId);

    return Reply.saying().ok();
  }
}
