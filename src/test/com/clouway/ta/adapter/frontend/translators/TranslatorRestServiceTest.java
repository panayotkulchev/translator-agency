package com.clouway.ta.adapter.frontend.translators;

import com.clouway.ta.core.translators.Translator;
import com.clouway.ta.core.translators.TranslatorRepository;
import com.google.common.collect.Lists;
import com.google.sitebricks.headless.Reply;
import org.jmock.Expectations;
import org.jmock.auto.Mock;
import org.jmock.integration.junit4.JUnitRuleMockery;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;

import java.util.ArrayList;

import static com.clouway.ta.adapter.frontend.translators.TranslatorDto.newTranslatorDto;
import static com.clouway.ta.core.translators.Translator.newTranslator;
import static com.clouway.ta.testing.FakeRequest.newRequest;
import static com.clouway.ta.testing.ReplyMatchers.contains;
import static com.clouway.ta.testing.ReplyMatchers.isOk;
import static org.junit.Assert.*;

public class TranslatorRestServiceTest {

  @Rule
  public JUnitRuleMockery context = new JUnitRuleMockery();

  @Mock
  private TranslatorRepository translatorRepository;

  private TranslatorRestService service;

  private String email = "test@abv.bg";
  private String otherEmail = "other@gmail.com";
  private String eid = "8510221465";

  @Before
  public void setUp() throws Exception {
    service = new TranslatorRestService(translatorRepository);
  }

  @Test
  public void getTranslatorByEmail() throws Exception {

    final Translator translator = newTranslator().email(email).eid(eid).build();

    context.checking(new Expectations() {{
      oneOf(translatorRepository).getById(email);
      will(returnValue(translator));
    }});

    Reply<?> reply = service.getByEmail(newRequest().parameter("email", email).build());

    assertThat(reply, isOk());
    assertThat(reply, contains(newTranslatorDto().email(email).eid(eid).build()));
  }

  @Test
  public void getFavoriteTranslators() throws Exception {

    final ArrayList<Translator> translators = Lists.newArrayList(
            newTranslator().email(email).languages(Lists.newArrayList("english")).build(),
            newTranslator().email(otherEmail).languages(Lists.newArrayList("bulgarian")).build());

    final ArrayList<TranslatorDto> expectedDtos = Lists.newArrayList(
            newTranslatorDto().email(email).languages(Lists.newArrayList("english")).languagesLine("eng").build(),
            newTranslatorDto().email(otherEmail).languages(Lists.newArrayList("bulgarian")).languagesLine("bul").build());

    context.checking(new Expectations() {{
      oneOf(translatorRepository).getFavorites();
      will(returnValue(translators));
    }});

    Reply<?> reply = service.getFavorites();

    assertThat(reply, isOk());
    assertThat(reply, contains(expectedDtos));
  }

  @Test
  public void getTranslatorByLanguages() throws Exception {

    final ArrayList<String> languages = Lists.newArrayList("bulgarian", "english");

    final ArrayList<Translator> translators = Lists.newArrayList(
            newTranslator().email(email).languages(Lists.newArrayList("english")).build(),
            newTranslator().email(otherEmail).languages(Lists.newArrayList("bulgarian")).build());

    final ArrayList<TranslatorDto> expectedDtos = Lists.newArrayList(
            newTranslatorDto().email(email).languages(Lists.newArrayList("english")).languagesLine("eng").build(),
            newTranslatorDto().email(otherEmail).languages(Lists.newArrayList("bulgarian")).languagesLine("bul").build());

    context.checking(new Expectations() {{
      oneOf(translatorRepository).getAllWith(languages);
      will(returnValue(translators));
    }});

    Reply<?> reply = service.getByLanguages(newRequest(languages));

    assertThat(reply, isOk());
    assertThat(reply, contains(expectedDtos));
  }

  @Test
  public void addTranslator() throws Exception {

    final Translator translator = newTranslator().email(email).build();

    context.checking(new Expectations() {{
      oneOf(translatorRepository).add(translator);
    }});

    Reply<?> reply = service.add(newRequest(newTranslatorDto().email(email).build()));

    assertThat(reply, isOk());
  }

  @Test
  public void editTranslator() throws Exception {

    final Translator translator = newTranslator().email(email).build();

    context.checking(new Expectations() {{
      oneOf(translatorRepository).edit(translator);
    }});

    Reply<?> reply = service.edit(newRequest(newTranslatorDto().email(email).build()));

    assertThat(reply, isOk());
  }

  @Test
  public void deleteTranslator() throws Exception {

    context.checking(new Expectations() {{
      oneOf(translatorRepository).deleteById(email);
    }});

    Reply<?> reply = service.delete(newRequest().parameter("id", email).build());

    assertThat(reply, isOk());

  }
}