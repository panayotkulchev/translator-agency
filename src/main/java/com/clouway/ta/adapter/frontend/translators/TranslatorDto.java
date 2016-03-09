package com.clouway.ta.adapter.frontend.translators;

import java.util.Collections;
import java.util.List;

/**
 * Created by Panayot Kulchev on 16-3-9.
 * e-mail: panayotkulchev@gmail.com
 * happy codding ...
 */
public class TranslatorDto {

  public static final class Builder {
    private String email;
    private String name;
    private String currentAddress;
    private String permanentAddress;
    private String phones;
    private List<String> languages;
    private String languagesLine;
    private String skype;
    private String eid;
    private String document;
    private String iban;
    private boolean favorite;
    private boolean registered;
    private String comment;

    private Builder() {
    }

    public Builder email(String val) {
      email = val;
      return this;
    }

    public Builder name(String val) {
      name = val;
      return this;
    }

    public Builder currentAddress(String val) {
      currentAddress = val;
      return this;
    }

    public Builder permanentAddress(String val) {
      permanentAddress = val;
      return this;
    }

    public Builder phones(String val) {
      phones = val;
      return this;
    }

    public Builder languages(List<String> val) {
      languages = val;
      return this;
    }

    public Builder languagesLine(String val) {
      languagesLine = val;
      return this;
    }

    public Builder skype(String val) {
      skype = val;
      return this;
    }

    public Builder eid(String val) {
      eid = val;
      return this;
    }

    public Builder document(String val) {
      document = val;
      return this;
    }

    public Builder iban(String val) {
      iban = val;
      return this;
    }

    public Builder favorite(boolean val) {
      favorite = val;
      return this;
    }

    public Builder registered(boolean val) {
      registered = val;
      return this;
    }

    public Builder comment(String val) {
      comment = val;
      return this;
    }

    public TranslatorDto build() {
      return new TranslatorDto(this);
    }
  }

  public static Builder newTranslatorDto() {
    return new Builder();
  }

  public final String email;
  public final String name;
  public final String currentAddress;
  public final String permanentAddress;
  public final String phones;
  public final List<String> languages;
  public String languagesLine;
  public final String skype;
  public final String eid;
  public final String document;
  public final String iban;
  public final boolean favorite;
  public final boolean registered;
  public final String comment;

  @SuppressWarnings("unused")
  public TranslatorDto() {
    this.email = null;
    this.name = null;
    this.currentAddress = null;
    this.permanentAddress = null;
    this.phones = null;
    this.languages = null;
    this.languagesLine = null;
    this.skype = null;
    this.eid = null;
    this.document = null;
    this.iban = null;
    this.favorite = false;
    this.registered = false;
    this.comment = null;
  }

  private TranslatorDto(Builder builder) {
    email = builder.email;
    name = builder.name;
    currentAddress = builder.currentAddress;
    permanentAddress = builder.permanentAddress;
    phones = builder.phones;
    languages = builder.languages;
    languagesLine = builder.languagesLine;
    skype = builder.skype;
    eid = builder.eid;
    document = builder.document;
    iban = builder.iban;
    favorite = builder.favorite;
    registered = builder.registered;
    comment = builder.comment;
  }

  public void createLanguageLine() {
    String languagesLine = "";
    Collections.sort(languages);
    for (String each : languages) {

      languagesLine += each.substring(0, 3) + ", ";
    }
    this.languagesLine = languagesLine.substring(0, languagesLine.length() - 2);
  }

}
