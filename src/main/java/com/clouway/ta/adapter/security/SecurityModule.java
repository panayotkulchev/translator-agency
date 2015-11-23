package com.clouway.ta.adapter.security;

import com.clouway.ta.adapter.http.validator.ParamHolder;
import com.clouway.ta.adapter.http.validator.RegexValidator;
import com.clouway.ta.adapter.http.validator.RequestParamHolder;
import com.clouway.ta.adapter.http.validator.Rule;
import com.clouway.ta.adapter.http.validator.ValidationRule;
import com.clouway.ta.adapter.http.validator.Validator;
import com.clouway.ta.core.SessionManager;
import com.clouway.ta.adapter.http.validator.ValidationRules;
import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;
import com.google.common.collect.Lists;
import com.google.inject.AbstractModule;
import com.google.inject.Provides;
import com.google.inject.Singleton;

import java.util.List;

/**
 * Created by Panayot Kulchev on 15-11-21.
 * e-mail: panayotkulchev@gmail.com
 * happy codding ...
 */
public class SecurityModule extends AbstractModule{
  @Override
  protected void configure() {
    bind(SessionManager.class).to(UserSessionManager.class);
    bind(Validator.class).to(RegexValidator.class);
    bind(ParamHolder.class).to(RequestParamHolder.class);
  }

  @Provides
  public UserService getUserService() {
    return UserServiceFactory.getUserService();
  }

//  @Provides
//  @RequestScoped
//  public CurrentUser getCurrentUser(SidFetcher sidFetcher, UserRepository userRepository) {
//
//    String sid = sidFetcher.fetch();
//
//    return userRepository.getBySid(sid);
//  }


  @Provides
  @Singleton
  @ValidationRules
  public List<Rule> getValidationRules() {

    List<Rule> rules = Lists.newArrayList();
    rules.add(new ValidationRule("email", "Email is not valid", "^[a-z]{3,30}+$"));
    rules.add(new ValidationRule("password", "Password is not valid", "^[a-z]{3,10}+$"));

    return rules;
  }

}
