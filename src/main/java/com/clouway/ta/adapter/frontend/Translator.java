package com.clouway.ta.adapter.frontend;


import com.google.api.client.util.Lists;
import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Index;

import java.util.List;

/**
 * Created by Panayot Kulchev on 15-10-14.
 * e-mail: panayotkulchev@gmail.com
 * happy codding ...
 */

@Entity
public class Translator {

  @Id
  public String email;
  public String name;
  public String currentAddress;
  public String permanentAddress;
  public String phones;
  public List<String> languages = Lists.newArrayList();
  public String languagesLine;
  public String skype;
  public String eid;
  public String document;
  public String iban;
  @Index
  public boolean favorite;
  public boolean registered;
  public String comment;

  @SuppressWarnings("unchecked")
  public Translator() {
  }

  public Translator(String email, String name, String currentAddress, String permanentAddress, String phones, List<String> languages, String languagesLine, String skype, String eid, String document, String iban, boolean favorite, boolean registered, String comment) {
    this.email = email;
    this.name = name;
    this.currentAddress = currentAddress;
    this.permanentAddress = permanentAddress;
    this.phones = phones;
    this.languages = languages;
    this.languagesLine = languagesLine;
    this.skype = skype;
    this.eid = eid;
    this.document = document;
    this.iban = iban;
    this.favorite = favorite;
    this.registered = registered;
    this.comment = comment;
  }

  public void createLanguageLine() {
    String languagesLine = "";
    for (String each : languages) {
      languagesLine += each + ", ";
    }
    this.languagesLine = languagesLine;
  }

  @Override
  public String toString() {
    return "Translator{" +
            "email='" + email + '\'' +
            ", name='" + name + '\'' +
            ", currentAddress='" + currentAddress + '\'' +
            ", permanentAddress='" + permanentAddress + '\'' +
            ", phones='" + phones + '\'' +
            ", languages=" + languages +
            ", languagesLine='" + languagesLine + '\'' +
            ", skype='" + skype + '\'' +
            ", eid='" + eid + '\'' +
            ", document='" + document + '\'' +
            ", iban='" + iban + '\'' +
            ", favorite=" + favorite +
            ", registered=" + registered +
            '}';
  }
}
