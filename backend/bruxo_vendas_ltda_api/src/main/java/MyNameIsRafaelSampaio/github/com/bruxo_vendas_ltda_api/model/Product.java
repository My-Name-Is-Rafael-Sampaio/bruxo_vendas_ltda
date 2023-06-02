package MyNameIsRafaelSampaio.github.com.bruxo_vendas_ltda_api.model;

import java.math.BigDecimal;
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
@Table(name = "product")
public class Product {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "bar_code", length = 20)
	private String barCode;
	
	@Column(name = "name", length = 100)
	private String name;
	
	@Column(name = "description", length = 255)
	private String description;
	
	@Column(name = "price", precision = 16, scale = 2)
	private BigDecimal price;
	
	@Column(name = "date_register", insertable = true, updatable = false)
	@JsonFormat(pattern = "dd/MM/yyyy")
	private LocalDate dateRegister;

	public Product() {
		super();
	}
	
	public Product(Long id, String barCode, String name, String description, BigDecimal price, LocalDate dateRegister) {
		super();
		this.id = id;
		this.barCode = barCode;
		this.name = name;
		this.description = description;
		this.price = price;
		this.dateRegister = dateRegister;
	}
	
	public Product(String barCode, String name, String description, BigDecimal price, LocalDate dateRegister) {
		super();
		this.barCode = barCode;
		this.name = name;
		this.description = description;
		this.price = price;
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

	public String getBarCode() {
		return barCode;
	}

	public void setBarCode(String barCode) {
		this.barCode = barCode;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public BigDecimal getPrice() {
		return price;
	}

	public void setPrice(BigDecimal price) {
		this.price = price;
	}

	public LocalDate getDateRegister() {
		return dateRegister;
	}

	public void setDateRegister(LocalDate dateRegister) {
		this.dateRegister = dateRegister;
	}

	@Override
	public String toString() {
		return "Product [id=" + id + ", barCode=" + barCode + ", name=" + name + ", description=" + description
				+ ", price=" + price + ", dateRegister=" + dateRegister + "]";
	}
}
