package MyNameIsRafaelSampaio.github.com.bruxo_vendas_ltda_api.rest.products;

import org.springframework.web.bind.annotation.RestController;


import MyNameIsRafaelSampaio.github.com.bruxo_vendas_ltda_api.model.Product;
import MyNameIsRafaelSampaio.github.com.bruxo_vendas_ltda_api.model.repository.ProductRepository;


import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/products")
@CrossOrigin("*")
public class ProductController {
	
	@Autowired
	private ProductRepository repository;
	
	@PostMapping
	public ProductFormRequest save(@RequestBody ProductFormRequest product) {
		Product productEntity = product.toModel();
		repository.save(productEntity);
		return ProductFormRequest.fromModel(productEntity);
	}
	
	@GetMapping
	public List<ProductFormRequest> getList() {
		return repository.findAll().stream().map(ProductFormRequest::fromModel).collect(Collectors.toList());
	}
	
	@GetMapping("{productId}")
	public ResponseEntity<ProductFormRequest> getById(@PathVariable Long productId) {
		return repository.findById(productId)
				.map(ProductFormRequest::fromModel)
				.map(productFormRequest -> ResponseEntity.ok(productFormRequest))
				.orElseGet(() -> ResponseEntity.notFound().build());
	}
	
	@PutMapping("{productId}")
	public ResponseEntity<Void> update(@PathVariable Long productId, @RequestBody ProductFormRequest request) {
		Optional<Product> productExists = repository.findById(productId);
		if (productExists.isEmpty()) {
			return ResponseEntity.notFound().build();
		}
		
		Product product = request.toModel();
		product.setId(productId);
		repository.save(product);
		return ResponseEntity.noContent().build();
	}
	
	@DeleteMapping("{productId}")
	public ResponseEntity<Void> delete(@PathVariable Long productId){
		Optional<Product> productExists = repository.findById(productId);
		
		if(productExists.isEmpty()) {
			return ResponseEntity.notFound().build();
		}
		
		repository.delete(productExists.get());
		return ResponseEntity.noContent().build();
	}

}
