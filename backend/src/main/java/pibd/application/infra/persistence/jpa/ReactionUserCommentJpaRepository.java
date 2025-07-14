package pibd.application.infra.persistence.jpa;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pibd.application.domain.model.ReactionUserComment;
import pibd.application.domain.utils.ReactionUserCommentId;

@Repository
public interface ReactionUserCommentJpaRepository extends JpaRepository<ReactionUserComment, ReactionUserCommentId> {
} 