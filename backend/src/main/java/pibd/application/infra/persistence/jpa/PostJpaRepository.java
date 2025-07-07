package pibd.application.infra.persistence.jpa;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pibd.application.domain.model.Post;

@Repository
public interface PostJpaRepository extends JpaRepository<Post, Long> {
}
