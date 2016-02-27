package com.clouway.ta;

import com.clouway.ta.adapter.db.PersistenceModule;
import com.clouway.ta.adapter.frontend.clients.ClientsRestService;
import com.clouway.ta.adapter.frontend.users.CurrentUserService;
import com.clouway.ta.adapter.frontend.languages.LanguagesRestService;
import com.clouway.ta.adapter.frontend.orders.OrderRestService;
import com.clouway.ta.adapter.frontend.translators.TranslatorRestService;
import com.clouway.ta.adapter.security.*;
import com.clouway.ta.core.CurrentUser;
import com.google.appengine.api.users.UserService;
import com.google.inject.AbstractModule;
import com.google.inject.Guice;
import com.google.inject.Injector;
import com.google.inject.Provides;
import com.google.inject.servlet.GuiceServletContextListener;
import com.google.inject.servlet.RequestScoped;
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

                filter("/*").through(EncodingFilter.class);
                filter("/*").through(ObjectifyFilter.class);
                filter("/*").through(OAuthCredentialsFilter.class);

              }
            },

            new PersistenceModule(),
            new SecurityModule(),

            new SitebricksModule() {
              @Override
              protected void configureSitebricks() {
                at("/r/translators").serve(TranslatorRestService.class);
                at("/r/languages").serve(LanguagesRestService.class);
                at("/r/clients").serve(ClientsRestService.class);
                at("/r/currentUser").serve(CurrentUserService.class);
                at("/r/orders").serve(OrderRestService.class);

                at("/loginPage").show(LoginPage.class);
                at("/logout").serve(LogoutService.class);
              }
            },
            new AbstractModule() {
              @Override
              protected void configure() {

              }

              @Provides
              @RequestScoped
              public CurrentUser getCurrentUser(UserService userService) {
                return new CurrentUser(userService.getCurrentUser().getEmail());
              }
            }


    );
  }
}
