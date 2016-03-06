package com.clouway.ta.adapter.frontend;

import com.clouway.ta.adapter.db.IndexWriter;
import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Index;

import java.util.Set;

/**
 * Created by Panayot Kulchev on 16-2-3.
 * e-mail: panayotkulchev@gmail.com
 * happy codding ...
 */

@Entity
public class Client {

  @Id
  public Long id;
  public String name;
  @Index
  public String eik;
  public String dds;
  public String address;
  public String mol;
  public String phone;
  @Index
  public Set<String> searchIndex;

  @SuppressWarnings("unchecked")
  public Client() {
  }

  public void createSearchIndex (){
    String name = this.name.replaceAll("\"|\'|-", "");
    this.searchIndex = IndexWriter.createIndex(name);
  }

  @Override
  public String toString() {
    return "Client{" +
            "id=" + id +
            ", name='" + name + '\'' +
            ", eik='" + eik + '\'' +
            ", dds='" + dds + '\'' +
            ", address='" + address + '\'' +
            ", mol='" + mol + '\'' +
            ", phone='" + phone + '\'' +
            '}';
  }
}
