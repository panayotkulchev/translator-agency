package com.clouway.ta.alltests;

import com.clouway.ta.adapter.db.PersistenceAdapterTestSuite;
import com.clouway.ta.adapter.frontend.FrontendAdapterTestSuite;
import org.junit.runner.RunWith;
import org.junit.runners.Suite;

/**
 * Created by Panayot Kulchev on 16-3-20.
 * e-mail: panayotkulchev@gmail.com
 * happy codding ...
 */
@RunWith(Suite.class)
@Suite.SuiteClasses({
        FrontendAdapterTestSuite.class,
        PersistenceAdapterTestSuite.class
})
public class AllTests {
}
