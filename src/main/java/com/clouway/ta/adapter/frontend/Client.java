package com.clouway.ta.adapter.frontend;

import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;

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

  @SuppressWarnings("unchecked")
  public Client() {
  }

  public Client(String name, String eik, String dds, String address, String mol, String phone) {
    this.name = name;
    this.eik = eik;
    this.dds = dds;
    this.address = address;
    this.mol = mol;
    this.phone = phone;
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
