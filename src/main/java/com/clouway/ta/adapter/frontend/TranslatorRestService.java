package com.clouway.ta.adapter.frontend;

import com.clouway.ta.adapter.db.LanguageRepository;
import com.clouway.ta.adapter.db.TranslatorRepository;
import com.google.inject.Inject;
import com.google.sitebricks.At;
import com.google.sitebricks.client.transport.Json;
import com.google.sitebricks.headless.Reply;
import com.google.sitebricks.headless.Request;
import com.google.sitebricks.headless.Service;
import com.google.sitebricks.http.Get;
import com.google.sitebricks.http.Post;
import com.vercer.engine.persist.ObjectDatastore;

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
  private final TranslatorRepository translatorRepository;
  private ObjectDatastore datastore;

  @Inject
  public TranslatorRestService(TranslatorService service, LanguageRepository languageRepository, TranslatorRepository translatorRepository, ObjectDatastore datastore) {
    this.service = service;
    this.languageRepository = languageRepository;
    this.translatorRepository = translatorRepository;
    this.datastore = datastore;
  }

  @Get
  public Reply<?> get(Request request) {

    languageRepository.add("english");
    languageRepository.mapUserId("english","dimitar");
    languageRepository.mapUserId("english","petar");
//    languageRepository.add("bulgarian");
    return Reply.saying().ok();
  }

  @At("/getByLanguages")
  @Post
  public Reply<?> getByLanguages(Request request) {

    List languages = request.read(List.class).as(Json.class);

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
