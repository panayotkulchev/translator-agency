package com.clouway.ta;

import com.clouway.ta.adapter.db.PersistenceModule;
import com.clouway.ta.adapter.frontend.LanguagesRestService;
import com.clouway.ta.adapter.frontend.TranslatorRestService;
import com.clouway.ta.adapter.security.*;
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

                filter("/*").through(EncodingFilter.class);
                filter("/*").through(ObjectifyFilter.class);
                filter("/login").through(LoginFilter.class);
                filter("/app").through(MainPageSecurityFilter.class);
                filter("/r/*").through(SecurityFilter.class);

              }
            },

            new PersistenceModule(),
            new SecurityModule(),

            new SitebricksModule() {
              @Override
              protected void configureSitebricks() {
                at("/r/translators").serve(TranslatorRestService.class);
                at("/r/languages").serve(LanguagesRestService.class);

                at("/login").show(LoginPage.class);
                at("/register").show(RegisterPage.class);
                at("/logout").serve(LogoutPage.class);
//                at("/rest").serve(Services.class);
//                at("/wallet").show(Wallet.class);
//                at("/oauth-callback").show(OAuthCallback.class);
                at("/app").show(App.class);
              }
            }

    );
  }
}
