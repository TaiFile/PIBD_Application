package pibd.application.infra.persistence.jpa;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pibd.application.domain.model.Comment;

import java.util.List;

@Repository
public interface CommentJpaRepository extends JpaRepository<Comment, Long> {
    List<Comment> findAllByPostId(Long postId);
}