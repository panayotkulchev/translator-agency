package com.clouway.ta.adapter.frontend.translators;

import com.clouway.ta.core.TranslatorRepository;
import com.clouway.ta.core.languages.LanguageRepository;
import com.clouway.ta.core.translators.Translator;
import com.google.api.client.util.Lists;
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

import static com.clouway.ta.adapter.frontend.translators.TranslatorDto.newTranslatorDto;
import static com.clouway.ta.core.translators.Translator.newTranslator;

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

    TranslatorDto dto = adapt(translator);

    return Reply.with(dto).as(Json.class);

  }

  @At("/favorites")
  @Get
  public Reply<?> getFavorites(Request request) {

    List<Translator> translators = translatorRepository.getFavorites();

    List<TranslatorDto> dtos = adapt(translators);
    for (TranslatorDto dto : dtos) {
      dto.createLanguageLine();
    }
    return Reply.with(dtos).as(Json.class);

  }

  @At("/getByLanguages")
  @Post
  public Reply<?> getByLanguages(Request request) {

    List languages = request.read(List.class).as(Json.class);

    List<Translator> translators = translatorRepository.getAllWith(languages);

    List<TranslatorDto> dtos = adapt(translators);

    for (TranslatorDto dto : dtos) {
      dto.createLanguageLine();
    }

    return Reply.with(dtos).as(Json.class);
  }

  @At("/add")
  @Post
  public Reply<?> add(Request request) {

    TranslatorDto translatorDto = request.read(TranslatorDto.class).as(Json.class);

    Translator translator = adapt(translatorDto);

    translatorRepository.add(translator);

    return Reply.saying().ok();
  }

  @At("/edit")
  @Post
  public Reply<?> edit(Request request) {

    TranslatorDto translatorDto = request.read(TranslatorDto.class).as(Json.class);

    Translator translator = adapt(translatorDto);

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

  // ADAPT METHODS
  private Translator adapt(TranslatorDto translatorDto) {
    return newTranslator()
            .email(translatorDto.email)
            .name(translatorDto.name)
            .currentAddress(translatorDto.currentAddress)
            .permanentAddress(translatorDto.permanentAddress)
            .phones(translatorDto.phones)
            .languages(translatorDto.languages)
            .skype(translatorDto.skype)
            .eid(translatorDto.eid)
            .document(translatorDto.document)
            .iban(translatorDto.iban)
            .favorite(translatorDto.favorite)
            .registered(translatorDto.registered)
            .comment(translatorDto.comment)
            .build();
  }

  private TranslatorDto adapt(Translator translator) {
    return newTranslatorDto()
            .email(translator.email)
            .name(translator.name)
            .currentAddress(translator.currentAddress)
            .permanentAddress(translator.permanentAddress)
            .phones(translator.phones)
            .languages(translator.languages)
            .skype(translator.skype)
            .eid(translator.eid)
            .document(translator.document)
            .iban(translator.iban)
            .favorite(translator.favorite)
            .registered(translator.registered)
            .comment(translator.comment)
            .build();
  }

  private List<TranslatorDto> adapt(List<Translator> translators) {
    List<TranslatorDto> dtos = Lists.newArrayList();

    for (Translator translator : translators) {
      dtos.add(adapt(translator));
    }

    return dtos;
  }
}
