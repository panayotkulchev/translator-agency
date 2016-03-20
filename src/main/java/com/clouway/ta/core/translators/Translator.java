package com.clouway.ta.core.translators;

import java.util.List;

/**
 * Created by Panayot Kulchev on 16-3-9.
 * e-mail: panayotkulchev@gmail.com
 * happy codding ...
 */
public class Translator {

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

    public Translator build() {
      return new Translator(this);
    }
  }

  public static Builder newTranslator() {
    return new Builder();
  }

  public final String email;
  public final String name;
  public final String currentAddress;
  public final String permanentAddress;
  public final String phones;
  public final List<String> languages;
  public final String languagesLine;
  public final String skype;
  public final String eid;
  public final String document;
  public final String iban;
  public final boolean favorite;
  public final boolean registered;
  public final String comment;

  public Translator() {
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

  private Translator(Builder builder) {
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

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;

    Translator that = (Translator) o;

    if (favorite != that.favorite) return false;
    if (registered != that.registered) return false;
    if (comment != null ? !comment.equals(that.comment) : that.comment != null) return false;
    if (currentAddress != null ? !currentAddress.equals(that.currentAddress) : that.currentAddress != null)
      return false;
    if (document != null ? !document.equals(that.document) : that.document != null) return false;
    if (eid != null ? !eid.equals(that.eid) : that.eid != null) return false;
    if (email != null ? !email.equals(that.email) : that.email != null) return false;
    if (iban != null ? !iban.equals(that.iban) : that.iban != null) return false;
    if (languages != null ? !languages.equals(that.languages) : that.languages != null) return false;
    if (languagesLine != null ? !languagesLine.equals(that.languagesLine) : that.languagesLine != null) return false;
    if (name != null ? !name.equals(that.name) : that.name != null) return false;
    if (permanentAddress != null ? !permanentAddress.equals(that.permanentAddress) : that.permanentAddress != null)
      return false;
    if (phones != null ? !phones.equals(that.phones) : that.phones != null) return false;
    if (skype != null ? !skype.equals(that.skype) : that.skype != null) return false;

    return true;
  }

  @Override
  public int hashCode() {
    int result = email != null ? email.hashCode() : 0;
    result = 31 * result + (name != null ? name.hashCode() : 0);
    result = 31 * result + (currentAddress != null ? currentAddress.hashCode() : 0);
    result = 31 * result + (permanentAddress != null ? permanentAddress.hashCode() : 0);
    result = 31 * result + (phones != null ? phones.hashCode() : 0);
    result = 31 * result + (languages != null ? languages.hashCode() : 0);
    result = 31 * result + (languagesLine != null ? languagesLine.hashCode() : 0);
    result = 31 * result + (skype != null ? skype.hashCode() : 0);
    result = 31 * result + (eid != null ? eid.hashCode() : 0);
    result = 31 * result + (document != null ? document.hashCode() : 0);
    result = 31 * result + (iban != null ? iban.hashCode() : 0);
    result = 31 * result + (favorite ? 1 : 0);
    result = 31 * result + (registered ? 1 : 0);
    result = 31 * result + (comment != null ? comment.hashCode() : 0);
    return result;
  }
}
