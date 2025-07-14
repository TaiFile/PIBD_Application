package pibd.application.application.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pibd.application.application.dto.PostResponseDTO;
import pibd.application.domain.model.Post;
import pibd.application.domain.model.ReactionUserPost;
import pibd.application.domain.utils.ReactionUserPostId;
import pibd.application.infra.persistence.jpa.PostJpaRepository;
import pibd.application.infra.persistence.jpa.ReactionUserPostJpaRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ListPostService {
    @Autowired
    private PostJpaRepository postRepository;

    @Autowired
    private ReactionUserPostJpaRepository reactionRepository;

    public List<PostResponseDTO> findAll(Long userId) {
        List<Post> posts = postRepository.findAll();
        
        return posts.stream()
                .map(post -> {
                    // Buscar reação do usuário para este post
                    ReactionUserPostId reactionId = new ReactionUserPostId(userId, post.getId());
                    Optional<ReactionUserPost> userReaction = reactionRepository.findById(reactionId);
                    
                    return new PostResponseDTO(
                            post.getId(),
                            post.getTitle(),
                            post.getContent(),
                            post.getDescription(),
                            post.getMediaUrls(),
                            post.getCreatedAt(),
                            post.getLocation(),
                            post.getStatus(),
                            post.getCategory(),
                            post.getReactions().size(), // Contar reações
                            post.getComments().size(), // Contar comentários
                            userReaction.map(ReactionUserPost::getType).orElse(null)
                    );
                })
                .toList();
    }
}
