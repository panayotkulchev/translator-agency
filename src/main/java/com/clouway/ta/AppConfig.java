package com.clouway.ta;

import com.clouway.ta.adapter.db.PersistenceModule;
import com.clouway.ta.adapter.frontend.LanguagesRestService;
import com.clouway.ta.adapter.frontend.TranslatorRestService;
import com.clouway.ta.adapter.security.LoginFilter;
import com.clouway.ta.adapter.security.LoginPage;
import com.clouway.ta.adapter.security.LogoutPage;
import com.clouway.ta.adapter.security.MainPageSecurityFilter;
import com.clouway.ta.adapter.security.RegisterPage;
import com.clouway.ta.adapter.security.SecurityFilter;
import com.clouway.ta.adapter.security.SecurityModule;
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
                filter("/login").through(LoginFilter.class);
                filter("/aaa").through(MainPageSecurityFilter.class);
                filter("/r/*").through(SecurityFilter.class);

//                filter("/*").through(SecurityFilter.class);
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
              }
            }

    );
  }
}
