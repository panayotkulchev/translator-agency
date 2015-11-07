package com.clouway.ta.adapter.frontend;

import com.clouway.ta.adapter.db.LanguageRepository;
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
  Reply <?> getAll(){
   List<String> langs =  repository.getAll();
    return Reply.with(langs).as(Json.class);
  }

  @Post
  Reply<?> add (Request request){

    String lang = request.param("lang");
    repository.add(lang);

    return Reply.saying().ok();
  }

}
