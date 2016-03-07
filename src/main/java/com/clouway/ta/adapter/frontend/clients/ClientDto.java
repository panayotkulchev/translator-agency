package com.clouway.ta.adapter.frontend.clients;

/**
 * Created by Panayot Kulchev on 16-3-7.
 * e-mail: panayotkulchev@gmail.com
 * happy codding ...
 */
class ClientDto {

  public static final class Builder {
    private Long id;
    private String name;
    private String eik;
    private String dds;
    private String address;
    private String mol;
    private String phone;

    private Builder() {
    }

    public Builder id(Long val) {
      id = val;
      return this;
    }

    public Builder name(String val) {
      name = val;
      return this;
    }

    public Builder eik(String val) {
      eik = val;
      return this;
    }

    public Builder dds(String val) {
      dds = val;
      return this;
    }

    public Builder address(String val) {
      address = val;
      return this;
    }

    public Builder mol(String val) {
      mol = val;
      return this;
    }

    public Builder phone(String val) {
      phone = val;
      return this;
    }

    public ClientDto build() {
      return new ClientDto(this);
    }
  }

  public static Builder newClientDto() {
    return new Builder();
  }

  public final Long id;
  public final String name;
  public final String eik;
  public final String dds;
  public final String address;
  public final String mol;
  public final String phone;

  @SuppressWarnings("unchecked")
  public ClientDto() {
    this.id = null;
    this.name = null;
    this.eik = null;
    this.dds = null;
    this.address = null;
    this.mol = null;
    this.phone = null;
  }

  private ClientDto(Builder builder) {
    id = builder.id;
    name = builder.name;
    eik = builder.eik;
    dds = builder.dds;
    address = builder.address;
    mol = builder.mol;
    phone = builder.phone;
  }
}
