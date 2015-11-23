package com.clouway.ta.adapter.db;

import com.clouway.ta.core.Config;
import com.clouway.ta.core.SessionRepository;

import static com.clouway.ta.adapter.db.OfyService.ofy;



/**
 * Created on 15-5-19.
 *
 * @author Panayot Kulchev <panayotkulchev@gmail.com>
 */

public class PersistentSessionRepository implements SessionRepository {

  @Override
  public void refresh(String sid, Long expirationTime) {

//    Session session = datastore.load(Session.class,sid);
//    session.expirationTime=expirationTime;
//    datastore.update(session);
  }

  @Override
  public boolean isExisting(String sid) {
    SessionEntity session = ofy().load().type(SessionEntity.class).id(sid).now();
//    return (datastore.load(Session.class, sid) != null);
    return session!=null;
  }

  @Override
  public void create(String userId, String sid) {

    SessionEntity session = new SessionEntity(sid, System.currentTimeMillis() + Config.SESSION_REFRESH_RATE, userId);

    ofy().save().entity(session).now();

  }

  @Override
  public void cleanExpired() {

//    final QueryResultIterator<Session> expiredSessions = datastore
//            .find()
//            .type(Session.class)
//            .addFilter("expirationTime", FilterOperator.LESS_THAN, System.currentTimeMillis())
//            .returnResultsNow();
//
//    datastore.deleteAll(Lists.newArrayList(expiredSessions));

  }

  @Override
  public void delete(String sid) {

//    datastore.delete(datastore.load(Session.class, sid));
  }

  @Override
  public Integer count() {
//    return datastore.find().type(Session.class).countResultsNow();
    return 5;
  }
}
