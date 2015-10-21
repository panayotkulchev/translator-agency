//package com.clouway.ta;
//
//import com.clouway.ta.adapter.frontend.PersistenceModule;
//import com.clouway.ta.adapter.frontend.TranslatorRestService;
//import com.clouway.ta.adapter.frontend.TranslatorService;
//import com.clouway.ta.adapter.frontend.TranslatorServiceImpl;
//import com.google.inject.AbstractModule;
//import com.google.inject.Guice;
//import com.google.inject.Injector;
//import com.google.inject.servlet.GuiceServletContextListener;
//import com.google.inject.servlet.ServletModule;
//import com.google.sitebricks.SitebricksModule;
//
//public class AppConfig extends GuiceServletContextListener {
//  @Override
//  protected Injector getInjector() {
//    return Guice.createInjector( new PersistenceModule(),
//
//            new AbstractModule() {
//              @Override
//              protected void configure() {
//                bind(TranslatorService.class).to(TranslatorServiceImpl.class);
//              }
//            },
//
//            new SitebricksModule() {
//              @Override
//              protected void configureSitebricks() {
//
//                at("/r/nomenclature/translators").serve(TranslatorRestService.class);
//              }
//            }
//    );
//  }
//}
