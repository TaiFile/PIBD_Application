package pibd.application.application.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pibd.application.application.dto.CreatePostDTO;
import pibd.application.application.dto.PostResponseDTO;
import pibd.application.domain.enums.Status;
import pibd.application.domain.model.Post;
import pibd.application.domain.model.User;
import pibd.application.infra.persistence.jpa.PostJpaRepository;
import pibd.application.infra.persistence.jpa.UserJpaRepository;
import java.time.LocalDateTime;

@Service
public class CreatePostService {
    @Autowired
    private PostJpaRepository postRepository;

    @Autowired
    private UserJpaRepository userRepository;

    public PostResponseDTO create(Long userId, CreatePostDTO request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado com ID: " + userId));

        Post post = new Post();
        post.setUser(user);
        post.setTitle(request.title());
        post.setContent(request.content());
        post.setDescription(request.description());
        post.setCategory(request.category());
        post.setLocation(request.locality());
        post.setMediaUrls(request.mediaUrls());
        post.setStatus(Status.EM_AVALIACAO);
        post.setCreatedAt(LocalDateTime.now());
        Post savedPost = postRepository.save(post);

        return new PostResponseDTO(
                savedPost.getId(),
                savedPost.getTitle(),
                savedPost.getContent(),
                savedPost.getDescription(),
                savedPost.getMediaUrls(),
                savedPost.getCreatedAt(),
                savedPost.getLocation(),
                savedPost.getStatus(),
                savedPost.getCategory(),
                0,
                0
        );
    }
}
