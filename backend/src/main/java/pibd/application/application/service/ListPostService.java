package pibd.application.application.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pibd.application.application.dto.PostResponseDTO;
import pibd.application.infra.persistence.jpa.PostJpaRepository;

import java.util.List;

@Service
public class ListPostService {
    @Autowired
    private PostJpaRepository postRepository;

    public List<PostResponseDTO> findAll() {
        return postRepository.findAll().stream()
                .map(post -> new PostResponseDTO(
                        post.getId(),
                        post.getTitle(),
                        post.getContent(),
                        post.getDescription(),
                        post.getMediaUrls(),
                        post.getCreatedAt(),
                        post.getLocality(),
                        post.getStatus(),
                        post.getCategory(),
                        0,
                        0
                ))
                .toList();
    }
}
