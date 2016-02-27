package com.clouway.ta.adapter.frontend.translators;

import com.clouway.ta.core.LanguageRepository;
import com.clouway.ta.core.TranslatorRepository;
import com.clouway.ta.adapter.frontend.Translator;
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

  private final TranslatorRepository translatorRepository;
  private final LanguageRepository languageRepository;

  @Inject
  public TranslatorRestService(TranslatorRepository translatorRepository, LanguageRepository languageRepository) {
    this.translatorRepository = translatorRepository;
    this.languageRepository = languageRepository;
  }

  @Get
  public Reply<?> getByEmail(Request request) {

    final String email = request.param("email");

    Translator translator = translatorRepository.getById(email);

    return Reply.with(translator).as(Json.class);

  }

  @At("/favorites")
  @Get
  public Reply<?> getFavorites(Request request) {

    List<Translator> translators = translatorRepository.getFavorites();

    for (Translator each: translators){
      each.createLanguageLine();
    }
    return Reply.with(translators).as(Json.class);

  }

  @At("/getByLanguages")
  @Post
  public Reply<?> getByLanguages(Request request) {

    List languages = request.read(List.class).as(Json.class);

    List<String> translatorIds = languageRepository.getUserIds(languages);

    List<Translator> translators = translatorRepository.getById(translatorIds);

    for (Translator each: translators){
      each.createLanguageLine();
    }

    return Reply.with(translators).as(Json.class);
  }

  @At("/add")
  @Post
  public Reply<?> add(Request request) {

    Translator translator = request.read(Translator.class).as(Json.class);

    translatorRepository.add(translator);

    return Reply.saying().ok();
  }

  @At("/edit")
  @Post
  public Reply<?> edit(Request request) {

    Translator translator = request.read(Translator.class).as(Json.class);

    translatorRepository.edit(translator);

    return Reply.saying().ok();
  }

  @At("/delete")
  @Delete
  public Reply<?> delete(Request request) {

    String translatorId = request.param("id");

    translatorRepository.deleteById(translatorId);

    return Reply.saying().ok();
  }
}
