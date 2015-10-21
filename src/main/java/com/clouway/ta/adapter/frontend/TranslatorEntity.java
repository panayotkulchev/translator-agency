package com.clouway.ta.adapter.frontend;

import com.vercer.engine.persist.annotation.Key;

import java.util.List;

/**
 * Created by Panayot Kulchev on 15-10-14.
 * e-mail: panayotkulchev@gmail.com
 * happy codding ...
 */
public class TranslatorEntity {
  @Key
  public String id;

  private String name;
  private String currentAddress;
  private String permanentAddress;
  private String phones;
  private List<String> languages;
  private List<String> educations;
  private String email;
  private String skype;
  private String eid;
  private String document;
  private String iban;

  @SuppressWarnings("unchecked")
    public TranslatorEntity() {
    }

  public TranslatorEntity(String name,
                          String currentAddress,
                          String permanentAddress,
                          String phones,
                          List<String> languages,
                          List<String> educations,
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
    this.educations = educations;
    this.email = email;
    this.skype = skype;
    this.eid = eid;
    this.document = document;
    this.iban = iban;
  }

  @Override
  public String toString() {
    return "TranslatorEntity{" +
            "key=" + id +
            ", name='" + name + '\'' +
            ", currentAddress='" + currentAddress + '\'' +
            ", permanentAddress='" + permanentAddress + '\'' +
            ", phones='" + phones + '\'' +
            ", languages=" + languages +
            ", education=" + educations +
            ", email='" + email + '\'' +
            ", skype='" + skype + '\'' +
            ", eid='" + eid + '\'' +
            ", document='" + document + '\'' +
            ", iban='" + iban + '\'' +
            '}';
  }
}
