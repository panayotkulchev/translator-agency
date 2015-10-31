package com.clouway.ta.adapter.frontend;

import com.vercer.engine.persist.annotation.Key;

import java.util.List;
import java.util.Set;

/**
 * Created by Panayot Kulchev on 15-10-14.
 * e-mail: panayotkulchev@gmail.com
 * happy codding ...
 */
public class Translator {
//  @Key
//  public String translId;

  //  public List<String> educations;
  @Key
  public String email;
  public String name;
  public String currentAddress;
  public String permanentAddress;
  public String phones;
  public List<String> languages;
  public String skype;
  public String eid;
  public String document;
  public String iban;

  @SuppressWarnings("unchecked")
    public Translator() {
    }

  public Translator(String name,
                    String currentAddress,
                    String permanentAddress,
                    String phones,
                    List<String> languages,
//                    List<String> educations,
                    String email,
                    String skype,
                    String eid,
                    String document,
                    String iban) {
    this.name = name;
    this.currentAddress = currentAddress;
    this.permanentAddress = permanentAddress;
    this.phones = phones;
    this.languages = languages;
//    this.educations = educations;
    this.email = email;
    this.skype = skype;
    this.eid = eid;
    this.document = document;
    this.iban = iban;
  }

  @Override
  public String toString() {
    return "TranslatorEntity{" +
//            "key=" + translId +
            ", name='" + name + '\'' +
            ", currentAddress='" + currentAddress + '\'' +
            ", permanentAddress='" + permanentAddress + '\'' +
            ", phones='" + phones + '\'' +
            ", languages=" + languages +
//            ", education=" + educations +
            ", email='" + email + '\'' +
            ", skype='" + skype + '\'' +
            ", eid='" + eid + '\'' +
            ", document='" + document + '\'' +
            ", iban='" + iban + '\'' +
            '}';
  }
}
