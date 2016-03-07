package com.clouway.ta.adapter.db.clients;

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
public class ClientEntity {

  public static final class Builder {
    private Long id;
    private String name;
    private String eik;
    private String dds;
    private String address;
    private String mol;
    private String phone;
    private Set<String> searchIndex;

    private Builder() {
    }

    public Builder id(Long val) {
      id = val;
      return this;
    }

    public Builder name(String val) {
      name = val;
      return this;
    }

    public Builder eik(String val) {
      eik = val;
      return this;
    }

    public Builder dds(String val) {
      dds = val;
      return this;
    }

    public Builder address(String val) {
      address = val;
      return this;
    }

    public Builder mol(String val) {
      mol = val;
      return this;
    }

    public Builder phone(String val) {
      phone = val;
      return this;
    }

    public Builder searchIndex(Set<String> val) {
      searchIndex = val;
      return this;
    }

    public ClientEntity build() {
      return new ClientEntity(this);
    }
  }

  public static Builder newClientEntity() {
    return new Builder();
  }

  @Id
  private Long id;
  private String name;
  @Index
  private String eik;
  private String dds;
  private String address;
  private String mol;
  private String phone;
  @Index
  private Set<String> searchIndex;


  public ClientEntity() {
  }

  private ClientEntity(Builder builder) {
    id = builder.id;
    name = builder.name;
    eik = builder.eik;
    dds = builder.dds;
    address = builder.address;
    mol = builder.mol;
    phone = builder.phone;
    searchIndex = builder.searchIndex;
  }

  public void setName(String name) {
    this.name = name;
  }

  public void setEik(String eik) {
    this.eik = eik;
  }

  public void setDds(String dds) {
    this.dds = dds;
  }

  public void setAddress(String address) {
    this.address = address;
  }

  public void setMol(String mol) {
    this.mol = mol;
  }

  public void setPhone(String phone) {
    this.phone = phone;
  }

  public void setSearchIndex(Set<String> searchIndex) {
    this.searchIndex = searchIndex;
  }

  public Long getId() {
    return id;
  }

  public String getName() {
    return name;
  }

  public String getEik() {
    return eik;
  }

  public String getDds() {
    return dds;
  }

  public String getAddress() {
    return address;
  }

  public String getMol() {
    return mol;
  }

  public String getPhone() {
    return phone;
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
