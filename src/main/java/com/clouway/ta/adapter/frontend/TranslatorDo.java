package com.clouway.ta.adapter.frontend;

import java.util.List;

/**
 * Created by Panayot Kulchev on 15-10-19.
 * e-mail: panayotkulchev@gmail.com
 * happy codding ...
 */
public class TranslatorDo {

  public final Long id;
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


  public TranslatorDo(String name, String currentAddress, String permanentAddress, String phones, List<String> languages, List<String> educations, String email, String skype, String eid, String document, String iban) {
    this.id = null;
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

}
