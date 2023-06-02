package MyNameIsRafaelSampaio.github.com.bruxo_vendas_ltda_api.model;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.PrePersist;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
@Table(name = "client")
public class Client {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "cpf", length = 14)
	private String cpf;
	
	@Column(name = "name", length = 100)
	private String name;
	
	@Column(name = "birth_date")
	@JsonFormat(pattern = "dd/MM/yyyy")
	private LocalDate birthDate;
	
	@Column(name = "address", length = 255)
	private String address;
	
	@Column(name = "telephone", length = 14)
	private String telephone;
	
	@Column(name = "email", length = 200)
	private String email;
	
	@Column(name = "date_register", insertable = true, updatable = false)
	@JsonFormat(pattern = "dd/MM/yyyy")
	private LocalDate dateRegister;

	public Client() {
		super();
	}
	
	public Client(Long id, String cpf, String name, LocalDate birthDate, String address, String telephone, String email,
			LocalDate dateRegister) {
		super();
		this.id = id;
		this.cpf = cpf;
		this.name = name;
		this.birthDate = birthDate;
		this.address = address;
		this.telephone = telephone;
		this.email = email;
		this.dateRegister = dateRegister;
	}
	
	public Client(String cpf, String name, LocalDate birthDate, String address, String telephone, String email,
			LocalDate dateRegister) {
		super();
		this.cpf = cpf;
		this.name = name;
		this.birthDate = birthDate;
		this.address = address;
		this.telephone = telephone;
		this.email = email;
		this.dateRegister = dateRegister;
	}

	@PrePersist
	public void prePersist() {
		setDateRegister(LocalDate.now());
	}
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getCpf() {
		return cpf;
	}

	public void setCpf(String cpf) {
		this.cpf = cpf;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public LocalDate getBirthDate() {
		return birthDate;
	}

	public void setBirthDate(LocalDate birthDate) {
		this.birthDate = birthDate;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getTelephone() {
		return telephone;
	}

	public void setTelephone(String telephone) {
		this.telephone = telephone;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public LocalDate getDateRegister() {
		return dateRegister;
	}

	public void setDateRegister(LocalDate dateRegister) {
		this.dateRegister = dateRegister;
	}

	@Override
	public String toString() {
		return "Client [id=" + id + ", cpf=" + cpf + ", name=" + name + ", birthDate=" + birthDate + ", address="
				+ address + ", telephone=" + telephone + ", email=" + email + ", dateRegister=" + dateRegister + "]";
	}
}
