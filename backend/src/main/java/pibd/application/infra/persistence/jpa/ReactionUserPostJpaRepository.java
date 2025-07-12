package pibd.application.infra.persistence.jpa;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pibd.application.domain.model.ReactionUserPost;
import pibd.application.domain.utils.ReactionUserPostId;

@Repository
public interface ReactionUserPostJpaRepository extends JpaRepository<ReactionUserPost, ReactionUserPostId> {
} 