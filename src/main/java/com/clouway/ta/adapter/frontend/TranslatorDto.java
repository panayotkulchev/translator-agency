package com.clouway.ta.adapter.frontend;

import java.util.List;

/**
 * Created by Panayot Kulchev on 15-10-14.
 * e-mail: panayotkulchev@gmail.com
 * happy codding ...
 */
public class TranslatorDto {

  public final String name;
  public final String currentAddress;
  public final String permanentAddress;
  public final String phones;
  public final List<String> languages;
  public final List<String> educations;
  public final String email;
  public final String skype;
  public final String eid;
  public final String document;
  public final String iban;

  @SuppressWarnings("unused")
  public TranslatorDto() {
    this.name = null;
    this.currentAddress = null;
    this.permanentAddress = null;
    this.phones = null;
    this.languages = null;
    this.educations = null;
    this.email = null;
    this.skype = null;
    this.eid = null;
    this.document = null;
    this.iban = null;
  }

  public TranslatorDto(String name,
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
    return "TranslatorDto{" +
            "name='" + name + '\'' +
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
