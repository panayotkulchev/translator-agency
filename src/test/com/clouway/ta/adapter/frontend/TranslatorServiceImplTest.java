package com.clouway.ta.adapter.frontend;

import com.clouway.ta.adapter.db.LanguageRepository;
import com.clouway.ta.adapter.db.TranslatorRepository;
import com.google.common.collect.Lists;
import org.jmock.Expectations;
import org.jmock.auto.Mock;
import org.jmock.integration.junit4.JUnitRuleMockery;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;

import java.util.List;

import static org.junit.Assert.*;

public class TranslatorServiceImplTest {

  @Rule
  public JUnitRuleMockery context = new JUnitRuleMockery();

  @Mock
  LanguageRepository languageRepository;
  @Mock
  TranslatorRepository translatorRepository;

  private TranslatorService service;

  @Before
  public void setUp() throws Exception {

    service = new TranslatorServiceImpl(translatorRepository,languageRepository);

  }

  @Test
  public void addTranslator() throws Exception {

    final String email = "ivan@abv.bg";
    final Translator translator = new Translator();
    final List<String> languages = Lists.newArrayList("english","bulgarian");
    translator.email= email;
    translator.languages=languages;

    context.checking(new Expectations() {{
      oneOf(translatorRepository).add(translator);
      oneOf(languageRepository).mapUserId(languages,email);
    }});

    service.add(translator);



  }
}