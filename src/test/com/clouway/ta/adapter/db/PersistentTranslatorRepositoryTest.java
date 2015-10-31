package com.clouway.ta.adapter.db;

import com.clouway.ta.adapter.frontend.Translator;
import com.google.appengine.tools.development.testing.LocalDatastoreServiceTestConfig;
import com.google.appengine.tools.development.testing.LocalServiceTestHelper;
import com.google.common.collect.Lists;
import com.vercer.engine.persist.ObjectDatastore;
import com.vercer.engine.persist.annotation.AnnotationObjectDatastore;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.util.List;

import static org.hamcrest.Matchers.is;
import static org.junit.Assert.*;

public class PersistentTranslatorRepositoryTest {

  private final LocalServiceTestHelper helper =
          new LocalServiceTestHelper(new LocalDatastoreServiceTestConfig());

  private final ObjectDatastore datastore = new AnnotationObjectDatastore();

  private final TranslatorRepository repository = new PersistentTranslatorRepository(datastore);

  @Before
  public void setUp() {
    helper.setUp();
  }

  @After
  public void tearDown() {
    helper.tearDown();
  }

  @Test
  public void addTranslator() throws Exception {

    Translator translator = new Translator();
    translator.email = "ivan@gmail.com";

    repository.add(translator);

    List<Translator> trnslators = findAll();

    assertThat(trnslators.size(),is(1));
    assertThat(trnslators.get(0).email,is("ivan@gmail.com"));
  }

  @Test
  public void addManyTranslators() throws Exception {

    Translator translator = new Translator();
    translator.email = "ivan@gmail.com";
    Translator other = new Translator();
    other.email = "peter@gmail.com";

    repository.add(translator);
    repository.add(other);

    List<Translator> trnslators = findAll();

    assertThat(trnslators.size(),is(2));
    assertThat(trnslators.get(0).email,is("ivan@gmail.com"));
    assertThat(trnslators.get(1).email,is("peter@gmail.com"));
  }

  @Test
  public void getOneById() throws Exception {

    String email = "ivan@gmail.com";
    registerTranslator(email);

    Translator result = repository.getById(email);

    assertThat(result.email,is("ivan@gmail.com"));
  }

  @Test
  public void getMany() throws Exception {

  registerTranslator("ivan@gmail.com","peter@abv.bg");

    List<String> searchedIds = Lists.newArrayList("ivan@gmail.com","peter@abv.bg");

    List<Translator> result = repository.getById(searchedIds);

    assertThat(result.size(),is(2));
    assertThat(result.get(0).email,is("ivan@gmail.com"));
    assertThat(result.get(1).email,is("peter@abv.bg"));

  }

  @Test
  public void delete() throws Exception {

    registerTranslator("ivan@abv.bg");

    repository.deleteById("ivan@abv.bg");

    List<Translator> translators = findAll();

    assertThat(translators.size(),is(0));
  }

  private void registerTranslator(String ... emails) {

    for (String each : emails){
      Translator translator = new Translator();
      translator.email = each;
      datastore.store(translator, each);
    }
  }

  private List<Translator> findAll() {
    return Lists.newArrayList(datastore.find(Translator.class));
  }
}