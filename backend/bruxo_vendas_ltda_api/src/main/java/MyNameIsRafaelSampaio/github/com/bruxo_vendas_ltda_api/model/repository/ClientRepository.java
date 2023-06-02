package MyNameIsRafaelSampaio.github.com.bruxo_vendas_ltda_api.model.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import MyNameIsRafaelSampaio.github.com.bruxo_vendas_ltda_api.model.Client;

public interface ClientRepository extends JpaRepository<Client, Long>{
	
	@Query("select c from Client c where c.cpf like :clientCpf and c.name like :clientName")
	Page<Client> filterSearch(@Param("clientCpf") String clientCpf, @Param("clientName") String clientName, Pageable pageable);
}
