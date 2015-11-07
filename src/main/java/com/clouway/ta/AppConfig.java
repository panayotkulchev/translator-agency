package com.clouway.ta;

import com.clouway.ta.adapter.db.PersistenceModule;
import com.clouway.ta.adapter.frontend.LanguagesRestService;
import com.clouway.ta.adapter.frontend.TranslatorRestService;
import com.google.inject.Guice;
import com.google.inject.Injector;
import com.google.inject.servlet.GuiceServletContextListener;
import com.google.inject.servlet.ServletModule;
import com.google.sitebricks.SitebricksModule;
import com.googlecode.objectify.ObjectifyFilter;

public class AppConfig extends GuiceServletContextListener {

  @Override
  protected Injector getInjector() {
    return Guice.createInjector(

            new ServletModule() {
              @Override
              protected void configureServlets() {
                filter("/*").through(ObjectifyFilter.class);
              }
            },

            new PersistenceModule(),

            new SitebricksModule() {
              @Override
              protected void configureSitebricks() {
                at("/r/translators").serve(TranslatorRestService.class);
                at("/r/languages").serve(LanguagesRestService.class);
              }
            }
    );
  }
}
