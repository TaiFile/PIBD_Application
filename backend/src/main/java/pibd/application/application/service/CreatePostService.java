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

import java.util.Date;
import java.util.HashSet;

@Service
public class CreatePostService {
    @Autowired
    private PostJpaRepository postRepository;

    @Autowired
    private UserJpaRepository userRepository;

    public PostResponseDTO create(Long userId, CreatePostDTO request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + userId));

        Post post = new Post();
        post.setUser(user);
        post.setTitle(request.title());
        post.setContent(request.content());
        post.setCreatedAt(new Date());
        post.setCategory(request.category());
        post.setStatus(Status.IN_VALIDATION);
        post.setDescription(request.description());
        post.setLocality(request.locality());
        post.setMediaUrls(new HashSet<>()); // ajuste conforme seu modelo

        Post savedPost = postRepository.save(post);

        return new PostResponseDTO(
                savedPost.getId(),
                savedPost.getTitle(),
                savedPost.getContent(),
                savedPost.getDescription(),
                savedPost.getMediaUrls(),
                savedPost.getCreatedAt(),
                savedPost.getLocality(),
                savedPost.getStatus(),
                savedPost.getCategory(),
                0, // reactionsCount
                0  // commentsCount
        );
    }
}