package com.clouway.ta.adapter.db;

import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Index;

/**
 * Created on 15-5-19.
 *
 * @author Panayot Kulchev <panayotkulchev@gmail.com>
 */

@Entity
public class Session {

  @Id
  public String sid;
  public Long expirationTime;
  @Index
  public String userId;

  public Session() {
  }

  public Session(String sid, Long expirationTime, String userId) {
    this.sid = sid;
    this.expirationTime = expirationTime;
    this.userId = userId;
  }

  @Override
  public String toString() {
    return sid + " " + expirationTime;
  }
}
