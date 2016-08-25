package com.clouway.ta.adapter.db.translators;


import com.google.api.client.util.Lists;
import com.google.appengine.api.datastore.Blob;
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
public class TranslatorEntity {

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
    private Blob avatar;

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

    public Builder avatar(String val) {
      avatar = new Blob(val.getBytes());
      return this;
    }

    public TranslatorEntity build() {
      return new TranslatorEntity(this);
    }
  }

  public static Builder newTranslatorEntity() {
    return new Builder();
  }

  @Id
  private String email;
  private String name;
  private String currentAddress;
  private String permanentAddress;
  private String phones;
  @Index
  private List<String> languages = Lists.newArrayList();
  private String languagesLine;
  private String skype;
  private String eid;
  private String document;
  private String iban;
  @Index
  private boolean favorite = false;
  private boolean registered = false;
  private String comment;
  private Blob avatar;


  @SuppressWarnings("unchecked")
  public TranslatorEntity() {
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getCurrentAddress() {
    return currentAddress;
  }

  public void setCurrentAddress(String currentAddress) {
    this.currentAddress = currentAddress;
  }

  public String getPermanentAddress() {
    return permanentAddress;
  }

  public void setPermanentAddress(String permanentAddress) {
    this.permanentAddress = permanentAddress;
  }

  public String getPhones() {
    return phones;
  }

  public void setPhones(String phones) {
    this.phones = phones;
  }

  public List<String> getLanguages() {
    return languages;
  }

  public void setLanguages(List<String> languages) {
    this.languages = languages;
  }

  public String getLanguagesLine() {
    return languagesLine;
  }

  public void setLanguagesLine(String languagesLine) {
    this.languagesLine = languagesLine;
  }

  public String getSkype() {
    return skype;
  }

  public void setSkype(String skype) {
    this.skype = skype;
  }

  public String getEid() {
    return eid;
  }

  public void setEid(String eid) {
    this.eid = eid;
  }

  public String getDocument() {
    return document;
  }

  public void setDocument(String document) {
    this.document = document;
  }

  public String getIban() {
    return iban;
  }

  public void setIban(String iban) {
    this.iban = iban;
  }

  public boolean isFavorite() {
    return favorite;
  }

  public void setFavorite(boolean favorite) {
    this.favorite = favorite;
  }

  public boolean isRegistered() {
    return registered;
  }

  public void setRegistered(boolean registered) {
    this.registered = registered;
  }

  public String getComment() {
    return comment;
  }

  public void setComment(String comment) {
    this.comment = comment;
  }

  public void setAvatar(String avatar) {
    this.avatar = new Blob(avatar.getBytes());
  }

  public String getAvatar() {
    return new String(avatar.getBytes());
  }

  private TranslatorEntity(Builder builder) {
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
    avatar = builder.avatar;
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
