package com.clouway.ta.adapter.db;

import com.clouway.ta.adapter.frontend.Language;
import com.google.appengine.tools.development.testing.LocalDatastoreServiceTestConfig;
import com.google.appengine.tools.development.testing.LocalServiceTestHelper;
import com.google.common.collect.Lists;
import com.vercer.engine.persist.ObjectDatastore;
import com.vercer.engine.persist.annotation.AnnotationObjectDatastore;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.util.List;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.junit.Assert.*;

public class PersistentLanguageRepositoryTest {

  private final LocalServiceTestHelper helper =
          new LocalServiceTestHelper(new LocalDatastoreServiceTestConfig());

  private final ObjectDatastore datastore = new AnnotationObjectDatastore();

  private final LanguageRepository repository = new PersistentLanguageRepository(datastore);

  @Before
  public void setUp() {
    helper.setUp();
  }

  @After
  public void tearDown() {
    helper.tearDown();
  }

  @Test
  public void addLanguage() throws Exception {

    repository.add("english");

    List<Language> all = findAll();

    assertThat(all.size(), is(1));
    assertThat(all.get(0).langId, is("english"));

  }

  @Test
  public void addAnotherLanguage() throws Exception {

    repository.add("bulgarian");

    List<Language> all = findAll();

    assertThat(all.size(), is(1));
    assertThat(all.get(0).langId, is("bulgarian"));

  }

  @Test
  public void addTwoLanguages() throws Exception {

    repository.add("bulgarian");
    repository.add("english");

    List<Language> all = findAll();

    assertThat(all.size(), is(2));
    assertThat(all.get(0).langId, is("bulgarian"));
    assertThat(all.get(1).langId, is("english"));

  }

  @Test
  public void mapUserToLanguage() throws Exception {

    repository.add("bulgarian");
    repository.mapUserId("bulgarian", "userId");

    assertTrue(findAll().get(0).translatorIds.contains("userId"));
  }

  @Test
  public void mapUserToManyLanguages() throws Exception {

    List<String> languagesToMapTo = Lists.newArrayList("bulgarian", "english");

    storeLanguage("bulgarian");
    storeLanguage("english");

    repository.mapUserId(languagesToMapTo, "userId123");

    List<Language> languages = findAll();

    assertThat(languages.get(0).translatorIds.get(0),is("userId123"));
    assertThat(languages.get(1).translatorIds.get(0),is("userId123"));
  }

  @Test
  public void mapTwoUsersToLanguage() throws Exception {

    repository.add("bulgarian");
    repository.mapUserId("bulgarian", "userId");
    repository.mapUserId("bulgarian", "otherId");

    List<String> ids = findAll().get(0).translatorIds;

    assertThat(ids.size(), is(2));
    assertThat(ids.get(0), is("userId"));
    assertThat(ids.get(1), is("otherId"));
  }

  @Test
  public void deleteLanguage() throws Exception {

    storeLanguage("bulgarian");

    repository.delete("bulgarian");

    List<Language> languages = Lists.newArrayList(datastore.find(Language.class));

    assertThat(languages.size(), is(0));

  }

  private void storeLanguage(String languageId) {

    Language language = new Language();
    language.langId = languageId;

    datastore.store(language, languageId);
  }


  private List<Language> findAll() {
    return Lists.newArrayList(datastore.find(Language.class));
  }
}