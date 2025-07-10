package pibd.application.domain.model;

import jakarta.persistence.*;

import java.util.Date;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Entity
public class Client extends User{
    @Column
    private String name;

    @Column
    private String phone;

    @Column
    private String cpf;

    @Column
    private Date birthDate;

    @OneToMany(mappedBy = "client", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Address> address = new HashSet<>();

    public Client() {
    }

    public Client(String email, String password, String name, String phone, String cpf, Date birthDate) {
        super(email, password);
        this.name = name;
        this.phone = phone;
        this.cpf = cpf;
        this.birthDate = birthDate;
    }

    public Set<Address> getAddress() {
        return address;
    }

    public void setAddress(Set<Address> address) {
        this.address = address;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public Date getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(Date birthDate) {
        this.birthDate = birthDate;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;
        Client client = (Client) o;
        return Objects.equals(getName(), client.getName()) && Objects.equals(getPhone(), client.getPhone()) && Objects.equals(getCpf(), client.getCpf()) && Objects.equals(getBirthDate(), client.getBirthDate()) && Objects.equals(getAddress(), client.getAddress());
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), getName(), getPhone(), getCpf(), getBirthDate(), getAddress());
    }

}
