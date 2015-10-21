package com.clouway.ta.adapter.frontend;

import java.util.List;

/**
 * Created by Panayot Kulchev on 15-10-19.
 * e-mail: panayotkulchev@gmail.com
 * happy codding ...
 */
public class TranslatorDo {

  private Long id;
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

  public TranslatorDo(String name, String currentAddress, String permanentAddress, String phones, List<String> languages, List<String> educations, String email, String skype, String eid, String document, String iban) {
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
