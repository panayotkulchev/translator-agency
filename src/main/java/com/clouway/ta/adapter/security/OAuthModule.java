package com.clouway.ta.adapter.security;

import com.google.api.client.http.HttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;
import com.google.inject.AbstractModule;
import com.google.inject.Provides;

import java.io.IOException;
import java.security.GeneralSecurityException;

/**
 * @author Panayot Kulchev <panayotkulchev@gmail.com>
 */

public class OAuthModule extends AbstractModule {
  @Override
  protected void configure() {

//    bind(TokenRepository.class).to(PersistentTokenRepository.class);
//    bind(OAuthAuthentication.class).to(OAuthAuthenticationImpl.class);
//    bind(CredentialRefreshListener.class).to(TokenRefreshListener.class);
  }

  @Provides
  public UserService getUserService() {
    return UserServiceFactory.getUserService();
  }

  @Provides
  public HttpTransport getHttpTransport() throws GeneralSecurityException, IOException {
    return new NetHttpTransport();
  }

  @Provides
  public JacksonFactory getJsonFactory() throws GeneralSecurityException, IOException {
    return new JacksonFactory();
  }

//  @Provides
//  @Singleton
//  @OAuthScopes
//  public List<String> getScopes() {
//    return Arrays.asList(
//
//            DirectoryScopes.ADMIN_DIRECTORY_USER,
//            DirectoryScopes.ADMIN_DIRECTORY_GROUP);
//  }

//  @Provides
//  @RequestScoped
//  public User getCurrentUser(UserService userService, Organization organization) {
//
//    final String email = userService.getCurrentUser().getEmail();
//    final Set<String> roles = organization.getUserRoles(email);
//    final User currentUser = new CurrentUser(email, roles.contains("OWNER") || roles.contains("MANAGER"));
//
//    return currentUser;
//  }

}
