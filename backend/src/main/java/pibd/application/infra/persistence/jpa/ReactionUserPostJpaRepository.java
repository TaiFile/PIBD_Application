package pibd.application.infra.persistence.jpa;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pibd.application.domain.model.ReactionUserPost;

@Repository
public interface ReactionUserPostJpaRepository extends JpaRepository<ReactionUserPost, Long> {
}
