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
  private final LanguageRepository languageRepository;

  @Inject
  public TranslatorRestService(TranslatorService service, LanguageRepository languageRepository) {
    this.service = service;
    this.languageRepository = languageRepository;
  }

  @Get
  public Reply<?> get(Request request) {

    List<String> languages = Lists.newArrayList("bulgarian","english");

    List<Translator> translators = service.getByLanguages(languages);

    return Reply.with(translators).as(Json.class);

  }

  @At("/getByLanguages")
  @Post
  public Reply<?> getByLanguages(Request request) {
    try {
      Thread.sleep(2000);
    } catch (InterruptedException e) {
      e.printStackTrace();
    }
    List languages = request.read(List.class).as(Json.class);

//    List<String> languages = Lists.newArrayList("bulgarian","english");

    List<Translator> translators = service.getByLanguages(languages);

    return Reply.with(translators).as(Json.class);
  }

  @At("/add")
  @Post
  public Reply<?> add(Request request) {

    Translator translator = request.read(Translator.class).as(Json.class);

    service.add(translator);

    return Reply.saying().ok();
  }
}
