package MyNameIsRafaelSampaio.github.com.bruxo_vendas_ltda_api.rest.products;

import java.math.BigDecimal;
import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

import MyNameIsRafaelSampaio.github.com.bruxo_vendas_ltda_api.model.Product;

public class ProductFormRequest {
	
	private Long id;
	private String barCode;
	private String name;
	private String description;
	private BigDecimal price;
	
	@JsonFormat(pattern = "dd/MM/yyyy")
	private LocalDate dateRegister;

	public ProductFormRequest() {
		super();
	}
	
	public ProductFormRequest(Long id, String barCode, String name, String description, BigDecimal price,
			LocalDate dateRegister) {
		super();
		this.id = id;
		this.barCode = barCode;
		this.name = name;
		this.description = description;
		this.price = price;
		this.dateRegister = dateRegister;
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

	public Product toModel() {
		return new Product(id, barCode, name, description, price, dateRegister);
	}
	
	public static ProductFormRequest fromModel(Product product) {
		return new ProductFormRequest(product.getId(), product.getBarCode(), product.getName(), product.getDescription(), product.getPrice(), product.getDateRegister());
	}
}
