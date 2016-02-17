package com.clouway.ta.adapter.frontend;

import com.clouway.ta.core.IndexWriter;
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
    this.searchIndex = IndexWriter.createIndex(name);
    this.searchIndex.add(eik);
    System.out.println("create search index" + this.searchIndex);
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
