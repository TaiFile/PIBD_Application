package pibd.application.infra.persistence.jpa;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pibd.application.domain.model.Client;

@Repository
public interface ClientJpaRepository extends JpaRepository<Client, Long> {
}
