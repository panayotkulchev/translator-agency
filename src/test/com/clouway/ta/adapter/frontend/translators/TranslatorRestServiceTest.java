package com.clouway.ta.adapter.frontend.translators;

import com.clouway.ta.core.TranslatorRepository;
import com.clouway.ta.core.translators.Translator;
import com.google.sitebricks.headless.Reply;
import org.jmock.Expectations;
import org.jmock.auto.Mock;
import org.jmock.integration.junit4.JUnitRuleMockery;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;

import static com.clouway.ta.testing.FakeRequest.newRequest;
import static com.clouway.ta.testing.ReplyMatchers.contains;
import static com.clouway.ta.adapter.frontend.translators.TranslatorDto.newTranslatorDto;
import static com.clouway.ta.core.translators.Translator.newTranslator;
import static org.junit.Assert.*;

public class TranslatorRestServiceTest {

  @Rule
  public JUnitRuleMockery context  =  new JUnitRuleMockery();

  @Mock
  private TranslatorRepository translatorRepository;

  private TranslatorRestService service;

  private String email = "test@abv.bg";
  private String eid = "8510221465";

  @Before
  public void setUp() throws Exception {
    service = new TranslatorRestService(translatorRepository);
  }

  @Test
  public void getTranslatorByEmail() throws Exception {

    final Translator translator = newTranslator().email(email).eid(eid).build();

    context.checking(new Expectations(){{
      oneOf(translatorRepository).getById(email);
      will(returnValue(translator));
    }});

    Reply<?> reply = service.getByEmail(newRequest().parameter("email", email).build());

    assertThat(reply, contains(newTranslatorDto().email(email).eid(eid).build()));
  }
}