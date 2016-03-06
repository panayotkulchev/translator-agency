package com.clouway.ta.adapter.frontend;

import java.util.Date;

/**
 * Created by Panayot Kulchev on 16-3-5.
 * e-mail: panayotkulchev@gmail.com
 * happy codding ...
 */
public class Comment {
  public String author;
  public Date createdOn;
  public String content;

  public Comment() {
  }

  public Comment(String author, Date createdOn, String content) {
    this.author = author;
    this.createdOn = createdOn;
    this.content = content;
  }
}
