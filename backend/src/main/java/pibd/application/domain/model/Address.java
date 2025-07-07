package pibd.application.domain.model;

import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import pibd.application.domain.enums.AddressType;

@Entity
@Table(name = "addresses")
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String cep;

    @Column
    private String neighborhood;

    @Column
    private String street;

    @Column
    private Integer number;

    @Column
    private String complement;

    @Column
    private AddressType type;

    @ManyToOne
    @JoinColumn(name = "client_id", nullable = false)
    private Client client;

    public Address() {

    }

    public Address(String cep, String neighborhood, String street, Integer number, String complement, AddressType type) {
        this.cep = cep;
        this.neighborhood = neighborhood;
        this.street = street;
        this.number = number;
        this.complement = complement;
        this.type = type;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public String getNeighborhood() {
        return neighborhood;
    }

    public void setNeighborhood(String neighborhood) {
        this.neighborhood = neighborhood;
    }

    public String getCep() {
        return cep;
    }

    public void setCep(String cep) {
        this.cep = cep;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public Integer getNumber() {
        return number;
    }

    public void setNumber(Integer number) {
        this.number = number;
    }

    public String getComplement() {
        return complement;
    }

    public void setComplement(String complement) {
        this.complement = complement;
    }

    public AddressType getType() {
        return type;
    }

    public void setType(AddressType type) {
        this.type = type;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        Address address = (Address) o;
        return Objects.equals(getCep(), address.getCep()) && Objects.equals(getNeighborhood(), address.getNeighborhood()) && Objects.equals(getStreet(), address.getStreet()) && Objects.equals(getNumber(), address.getNumber()) && Objects.equals(getComplement(), address.getComplement()) && getType() == address.getType() && Objects.equals(getClient(), address.getClient());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getCep(), getNeighborhood(), getStreet(), getNumber(), getComplement(), getType(), getClient());
    }
}
