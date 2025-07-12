package pibd.application.domain.model;

import java.sql.Date;

import jakarta.persistence.*;

@Entity
@Table(name = "Cidadao")
public class Citizen extends User{

    @Column(name = "nome")
    private String name;

    @Column(name = "data_nascimento")
    private Date birthDate;

    @Column(name = "cpf", unique = true)
    private String cpf;

    @Column(name = "telefone")
    private String phone;
    
    @Column(name = "idade")
    private Integer age;

    @Column(name = "tipo_logradouro")
    private String addressType;

    @Column(name = "logradouro")
    private String street;

    @Column(name = "numero")
    private String number;

    @Column(name = "complemento")
    private String complement;

    @Column(name = "bairro")
    private String neighborhood;

    @Column(name = "cep")
    private String cep;

    public Citizen() {
    }

    public Citizen(String email, String password, String name, String phone, String cpf, Date birthDate) {
        super(email, password);
        this.name = name;
        this.phone = phone;
        this.cpf = cpf;
        this.birthDate = birthDate;
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

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getAddressType() {
        return addressType;
    }

    public void setAddressType(String addressType) {
        this.addressType = addressType;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public String getComplement() {
        return complement;
    }

    public void setComplement(String complement) {
        this.complement = complement;
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
}
