package MyNameIsRafaelSampaio.github.com.bruxo_vendas_ltda_api.rest.sales;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import MyNameIsRafaelSampaio.github.com.bruxo_vendas_ltda_api.model.Sale;
import MyNameIsRafaelSampaio.github.com.bruxo_vendas_ltda_api.model.repository.SaleItemRepository;
import MyNameIsRafaelSampaio.github.com.bruxo_vendas_ltda_api.model.repository.SaleRepository;

@RestController
@RequestMapping("/api/sales")
@CrossOrigin("*")
public class SaleController {
	
	@Autowired
	private SaleRepository repository;
	
	@Autowired
	private SaleItemRepository saleItemrepository;
	
	@PostMapping
	@Transactional
	public void save(@RequestBody Sale sale) {
		repository.save(sale);
		sale.getItems().stream().forEach(saleItem -> saleItem.setSale(sale));
		saleItemrepository.saveAll(sale.getItems());
	}
	
}
