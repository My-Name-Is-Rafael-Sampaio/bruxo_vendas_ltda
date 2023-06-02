package MyNameIsRafaelSampaio.github.com.bruxo_vendas_ltda_api.model;

import java.math.BigDecimal;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import MyNameIsRafaelSampaio.github.com.bruxo_vendas_ltda_api.model.util.SaleDeserializer;

@Entity
@Table(name = "sale")
@JsonDeserialize(using = SaleDeserializer.class)
public class Sale {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne
	@JoinColumn(name = "client_id")
	private Client client;

	@OneToMany(mappedBy = "sale")
	private List<SaleItem> items;

	@Column(name = "payment_type", length = 10)
	@Enumerated(EnumType.STRING)
	private PaymentType paymentType;

	@Column(name = "amount", precision = 16, scale = 2)
	private BigDecimal amount;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Client getClient() {
		return client;
	}

	public void setClient(Client client) {
		this.client = client;
	}

	public List<SaleItem> getItems() {
		return items;
	}

	public void setItems(List<SaleItem> items) {
		this.items = items;
	}

	public PaymentType getPaymentType() {
		return paymentType;
	}

	public void setPaymentType(PaymentType paymentType) {
		this.paymentType = paymentType;
	}

	public BigDecimal getAmount() {
		return amount;
	}

	public void setAmount(BigDecimal amount) {
		this.amount = amount;
	}

	@Override
	public String toString() {
		return "Sale [id=" + id + ", client=" + client + ", items=" + items + ", paymentType=" + paymentType
				+ ", amount=" + amount + "]";
	}

}
