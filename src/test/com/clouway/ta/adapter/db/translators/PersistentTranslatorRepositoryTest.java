package com.clouway.ta.adapter.db.translators;

import com.clouway.ta.core.translators.Translator;
import com.clouway.ta.core.translators.TranslatorRepository;
import com.google.appengine.tools.development.testing.LocalDatastoreServiceTestConfig;
import com.google.appengine.tools.development.testing.LocalServiceTestHelper;
import com.google.common.collect.Lists;
import com.googlecode.objectify.ObjectifyFactory;
import com.googlecode.objectify.ObjectifyService;
import com.googlecode.objectify.cache.AsyncCacheFilter;
import com.googlecode.objectify.util.Closeable;
import org.junit.After;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;

import java.util.List;

import static com.clouway.ta.adapter.db.OfyService.ofy;
import static com.clouway.ta.core.translators.Translator.newTranslator;
import static org.hamcrest.core.Is.is;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertThat;


public class PersistentTranslatorRepositoryTest {

  private final LocalServiceTestHelper helper =
          new LocalServiceTestHelper(new LocalDatastoreServiceTestConfig());

  protected Closeable session;

  private TranslatorRepository repository;

  private String email = "translator@google.com";
  private String name = "Ivan Petrov";


  @BeforeClass
  public static void setUpBeforeClass() {
    // Reset the Factory so that all translators work properly.
    ObjectifyService.setFactory(new ObjectifyFactory());
  }

  @Before
  public void setUp() {
    // New Objectify 5.1 Way. See https://groups.google.com/forum/#!topic/objectify-appengine/O4FHC_i7EGk
    this.session = ObjectifyService.begin();

    this.helper.setUp();

    repository = new PersistentTranslatorRepository();
  }

  @After
  public void tearDown() {
    AsyncCacheFilter.complete();

    // New Objectify 5.1 Way. See https://groups.google.com/forum/#!topic/objectify-appengine/O4FHC_i7EGk
    this.session.close();

    this.helper.tearDown();
  }

  @Test
  public void addTranslator() throws Exception {

    repository.add(newTranslator().email(email).build());

    List<TranslatorEntity> translators = ofy().load().type(TranslatorEntity.class).list();

    assertThat(translators.size(), is(1));
    assertThat(translators.get(0).getEmail(), is(email));
  }

  @Test
  public void editTranslator() throws Exception {

    repository.add(newTranslator().email(email).build());

    repository.edit(newTranslator().email(email).name(name).build());

    List<TranslatorEntity> translators = ofy().load().type(TranslatorEntity.class).list();

    assertThat(translators.size(), is(1));
    assertThat(translators.get(0).getEmail(), is(email));
    assertThat(translators.get(0).getName(), is(name));
  }

  @Test
  public void getTranslatorById() throws Exception {

    repository.add(newTranslator().email(email).build());
    repository.add(newTranslator().email("otherEmail").build());

    Translator translator = repository.getById(email);

    assertThat(translator.email, is(email));
  }

  @Test
  public void deleteTranslatorById() throws Exception {

    repository.add(newTranslator().email(email).build());
    repository.add(newTranslator().email("otherEmail").build());

    repository.deleteById(email);

    List<TranslatorEntity> translators = ofy().load().type(TranslatorEntity.class).list();

    assertThat(translators.size(), is(1));
    assertFalse(email, equals(translators.get(0).getEmail()));
  }

  @Test
  public void getAllTranslatorWithCertainLanguages() throws Exception {

    repository.add(aNewTranslator(email, Lists.newArrayList("bulgarian")));
    repository.add(aNewTranslator("secondEmail", Lists.newArrayList("english")));
    repository.add(aNewTranslator("thirdEmail", Lists.newArrayList("russian")));

    List<Translator> translators = repository.getAllWith(Lists.newArrayList("english", "bulgarian"));

    assertThat(translators.size(), is(2));
    assertThat(translators.get(0).email, is(email));
    assertThat(translators.get(1).email, is("secondEmail"));
  }

  @Test
  public void getFavoriteTranslators() throws Exception {

    repository.add(aNewTranslator(email, Lists.newArrayList("bulgarian"), true));
    repository.add(aNewTranslator("secondEmail", Lists.newArrayList("english"), false));
    repository.add(aNewTranslator("thirdEmail", Lists.newArrayList("russian"), false));

    List<Translator> translators = repository.getFavorites();

    assertThat(translators.size(), is(1));
    assertThat(translators.get(0).email, is(email));
  }

  private Translator aNewTranslator(String email, List<String> languages, boolean favorite) {
    return newTranslator().email(email).languages(languages).favorite(favorite).build();
  }

  private Translator aNewTranslator(String email, List<String> languages){
    return aNewTranslator(email, languages, false);
  }
}