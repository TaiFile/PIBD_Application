package pibd.application.application.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pibd.application.application.dto.CommentResponseDTO;
import pibd.application.infra.persistence.jpa.CommentJpaRepository;
import pibd.application.infra.persistence.jpa.PostJpaRepository;

import java.util.List;

@Service
public class ListCommentService {
    @Autowired
    private CommentJpaRepository commentRepository;

    @Autowired
    private PostJpaRepository postRepository;

    public List<CommentResponseDTO> findAllByPostId(Long postId) {
        if (!postRepository.existsById(postId)) {
            throw new IllegalArgumentException("Post não encontrado com ID: " + postId);
        }

        return commentRepository.findAllByPostId(postId).stream()
                .map(comment -> new CommentResponseDTO(
                        comment.getId(),
                        comment.getContent(),
                        comment.getCreatedAt(),
                        comment.getAuthor(),
                        comment.getPost()
                ))
                .toList();
    }
}
