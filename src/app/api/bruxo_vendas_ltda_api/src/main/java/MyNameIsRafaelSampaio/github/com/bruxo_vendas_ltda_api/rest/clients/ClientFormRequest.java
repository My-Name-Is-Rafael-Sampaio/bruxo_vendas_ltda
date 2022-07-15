package MyNameIsRafaelSampaio.github.com.bruxo_vendas_ltda_api.rest.clients;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

import MyNameIsRafaelSampaio.github.com.bruxo_vendas_ltda_api.model.Client;

public class ClientFormRequest {

	private Long id;
	private String cpf;
	private String name;
	
	@JsonFormat(pattern = "dd/MM/yyyy")
	private LocalDate birthDate;
	
	private String address;
	private String telephone;
	private String email;
	
	@JsonFormat(pattern = "dd/MM/yyyy")
	private LocalDate dateRegister;
	
	public ClientFormRequest() {
		super();
	}

	public ClientFormRequest(Long id, String cpf, String name, LocalDate birthDate, String address, String telephone,
			String email, LocalDate dateRegister) {
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

	public Client toModel() {
		return new Client(id, cpf, name, birthDate, address, telephone, email, dateRegister);
	}
	
	public static ClientFormRequest fromModel(Client client) {
		return new ClientFormRequest(client.getId(), client.getCpf(), client.getName(), client.getBirthDate(), client.getAddress(), client.getTelephone(), client.getEmail(), client.getDateRegister());
	}
}
