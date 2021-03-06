package com.clouway.ta.adapter.security;


import com.clouway.ta.core.users.UserRepository;
import com.clouway.ta.adapter.http.validator.Validator;
import com.clouway.ta.core.examples.SessionManager;
import com.google.appengine.api.users.UserService;
import com.google.inject.Inject;
import com.google.inject.Provider;
import com.google.sitebricks.At;
import com.google.sitebricks.Show;
import com.google.sitebricks.http.Get;
import com.google.sitebricks.http.Post;


import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
* Created on 15-5-5.
*
* @author Panayot Kulchev <panayotkulchev@gmail.com>
*/

@At("/loginPage")
@Show("login.html")
public class LoginPage {

  public String email;
  public String password;
  public String message;
  public String errorMessage;
  public String oauthURL;

  private final UserRepository userRepository;
  private final SessionManager userSessionManager;
  private final Validator validator;
  private final Provider<HttpServletRequest> requestProvider;
  private final UserService userService;

  @Inject
  public LoginPage(UserRepository userRepository,
                   SessionManager userSessionManager,
                   Validator validator,
                   Provider<HttpServletRequest> requestProvider, UserService userService) {

    this.userRepository = userRepository;
    this.userSessionManager = userSessionManager;
    this.validator = validator;
    this.requestProvider = requestProvider;
    this.userService = userService;
  }

  @Get
  public String googleOAuthLogin(){
    return userService.createLoginURL("/#/");
  }

  @Post
  public String login() {

    List<String> errorList = validator.validateRequestParams();

    if (errorList.size() != 0) {
      return "/login?errorMessage=" + errorList.get(0);
    }

    boolean authorizationResult = userRepository.authorize(email, password);

    if (!authorizationResult) {
      return "/login?errorMessage=User do not exist!";
    }
    System.out.println("creating session");
    userSessionManager.create(email);

    return "/#/";
//    return "/login";

  }

//  @Get
//  public void createAuthentificationLink() throws URISyntaxException, MalformedURLException {
//
//    HttpServletRequest request = requestProvider.get();
//    String state = RandomStringUtils.random(32, true, true);
//    request.getSession().setAttribute("oauth2-state", state);
//
//    URIBuilder builder = new URIBuilder("https://accounts.google.com/o/oauth2/auth");
//
//    builder.addParameter("state", state);
//
////      URL redirectUrl = Util.getAbsoluteUrl(request, "server-side-webapp-flow-callback.jsp"); // origin works
//    URL redirectUrl = Util.getAbsoluteUrl(request, "oauth-callback");
//
////      builder.addParameter("redirect_uri", "http://wallet-angularjs-gae.appspot.com/oauth-callback");
//    builder.addParameter("redirect_uri", redirectUrl.toString());
////    System.out.println(redirectUrl.toString());
////      builder.addParameter("client_id", "975229642235-slatste5to3kb3f0gv100qm27ril6jfs.apps.googleusercontent.com");
//    builder.addParameter("client_id", "334412481728-odc16ekeohanqdqjiqng1b9finubf8gn.apps.googleusercontent.com");
//    builder.addParameter("response_type", "code");
//    builder.addParameter("scope", "profile email");
//    builder.addParameter("approval_prompt", "force");
//
//    oauthURL = builder.toString();
//    System.out.println("google login");
//    oauthURL = userService.createLoginURL("/#/");
//  }
}
