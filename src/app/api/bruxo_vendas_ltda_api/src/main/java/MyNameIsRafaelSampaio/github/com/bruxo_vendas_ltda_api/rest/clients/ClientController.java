package MyNameIsRafaelSampaio.github.com.bruxo_vendas_ltda_api.rest.clients;


import java.util.Optional;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import MyNameIsRafaelSampaio.github.com.bruxo_vendas_ltda_api.model.Client;
import MyNameIsRafaelSampaio.github.com.bruxo_vendas_ltda_api.model.repository.ClientRepository;

@RestController
@RequestMapping("/api/clients")
@CrossOrigin("*")
public class ClientController {

	@Autowired
	private ClientRepository repository;
	
	@PostMapping
	public ClientFormRequest save( @RequestBody ClientFormRequest client ) {
		
		Client clientEntity = client.toModel();
		repository.save(clientEntity);
		return ClientFormRequest.fromModel(clientEntity);
		
	}
	
	@GetMapping
	public Page<ClientFormRequest> getList(@RequestParam(value = "clientCpf", required = false, defaultValue = "") String clientCpf, @RequestParam(value = "clientName", required = false, defaultValue = "") String clientName, Pageable pageable) {
		return repository.filterSearch("%"+clientCpf+"%", "%"+clientName+"%", pageable).map(ClientFormRequest::fromModel);
	}
	
	@GetMapping("{clientId}")
	public ResponseEntity<ClientFormRequest> getById(@PathVariable Long clientId) {
		return repository.findById(clientId)
				.map(ClientFormRequest::fromModel)
				.map(clientFormRequest -> ResponseEntity.ok(clientFormRequest))
				.orElseGet(() -> ResponseEntity.notFound().build());
	}
	
	@PutMapping("{clientId}")
	public ResponseEntity<Void> update(@PathVariable Long clientId, @RequestBody ClientFormRequest request) {
		Optional<Client> clientExists = repository.findById(clientId);
		if (clientExists.isEmpty()) {
			return ResponseEntity.notFound().build();
		}
		
		Client client = request.toModel();
		client.setId(clientId);
		repository.save(client);
		return ResponseEntity.noContent().build();
	}
	
	@DeleteMapping("{clientId}")
	public ResponseEntity<Object> delete(@PathVariable Long clientId) {
		return repository.findById(clientId)
				.map(client -> {
					repository.delete(client);
					return ResponseEntity.noContent().build();
				})
				.orElseGet(() -> ResponseEntity.notFound().build());
	}
}
