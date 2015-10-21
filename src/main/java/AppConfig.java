import com.clouway.hr.adapter.frontend.translator.TranslatorRestService;
import com.clouway.hr.adapter.http.oauth2.OAuthCredentialsFilter;
import com.clouway.hr.adapter.http.oauth2.OAuthModule;
import com.clouway.hr.adapter.http.oauth2.OAuthService;
import com.clouway.hr.adapter.frontend.translator.PersistenceModule;
import com.google.inject.Guice;
import com.google.inject.Injector;
import com.google.inject.servlet.GuiceServletContextListener;
import com.google.inject.servlet.ServletModule;
import com.google.sitebricks.SitebricksModule;

/**
* @author Dimitar Dimitrov (dimitar.dimitrov045@gmail.com)
*/
public class AppConfig extends GuiceServletContextListener {
    @Override
    protected Injector getInjector() {
        return Guice.createInjector(new PersistenceModule(), new OAuthModule(),
                new ServletModule() {
                    @Override
                    protected void configureServlets() {

                        filter("/1").through(OAuthCredentialsFilter.class);

                    }
                },

                new SitebricksModule() {
                    @Override
                    protected void configureSitebricks() {
                        at("/oauth").serve(OAuthService.class);
                        at("/r/nomenclature/translators").serve(TranslatorRestService.class);
                    }
                }
        );
    }
}
