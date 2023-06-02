package MyNameIsRafaelSampaio.github.com.bruxo_vendas_ltda_api.model.util;

import java.io.IOException;
import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonNode;

import MyNameIsRafaelSampaio.github.com.bruxo_vendas_ltda_api.model.Client;
import MyNameIsRafaelSampaio.github.com.bruxo_vendas_ltda_api.model.PaymentType;
import MyNameIsRafaelSampaio.github.com.bruxo_vendas_ltda_api.model.Sale;
import MyNameIsRafaelSampaio.github.com.bruxo_vendas_ltda_api.model.SaleItem;

public class SaleDeserializer extends JsonDeserializer<Sale> {

	private static final NumberFormat NUMBER_FORMAT = new DecimalFormat("#,##0.00");

	@Override
	public Sale deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException {
		JsonNode rootNode = jsonParser.getCodec().readTree(jsonParser);

		Client client = jsonParser.getCodec().treeToValue(rootNode.get("client"), Client.class);

		List<SaleItem> items = new ArrayList<>();
		JsonNode itemsNode = rootNode.get("items");
		if (itemsNode.isArray()) {
			for (JsonNode itemNode : itemsNode) {
				SaleItem item = jsonParser.getCodec().treeToValue(itemNode, SaleItem.class);
				items.add(item);
			}
		}

		PaymentType paymentType = PaymentType.valueOf(rootNode.get("paymentType").asText());

		BigDecimal amount;
		JsonNode amountNode = rootNode.get("amount");
		if (amountNode != null) {
			String amountValue = amountNode.asText();
			amountValue = amountValue.replaceAll("[^\\d.,-]", "").trim();

			try {
				Number parsedNumber = NUMBER_FORMAT.parse(amountValue);
				amount = BigDecimal.valueOf(parsedNumber.doubleValue());
			} catch (ParseException e) {
				throw new IllegalArgumentException("Valor inválido para BigDecimal: " + amountValue);
			}
		} else {
			amount = BigDecimal.ZERO;
		}

		Sale sale = new Sale();
		sale.setClient(client);
		sale.setItems(items);
		sale.setPaymentType(paymentType);
		sale.setAmount(amount);

		return sale;
	}
}