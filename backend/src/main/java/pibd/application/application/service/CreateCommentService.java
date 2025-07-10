package pibd.application.application.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pibd.application.application.dto.CommentResponseDTO;
import pibd.application.application.dto.CreateCommentDTO;
import pibd.application.domain.model.Comment;
import pibd.application.domain.model.Post;
import pibd.application.domain.model.User;
import pibd.application.infra.persistence.jpa.CommentJpaRepository;
import pibd.application.infra.persistence.jpa.PostJpaRepository;
import pibd.application.infra.persistence.jpa.UserJpaRepository;

@Service
public class CreateCommentService {
    @Autowired
    private CommentJpaRepository commentRepository;

    @Autowired
    private UserJpaRepository userRepository;

    @Autowired
    private PostJpaRepository postRepository;

    public CommentResponseDTO create(Long userId, Long postId, CreateCommentDTO request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado com ID: " + userId));

        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("Post não encontrado com ID: " + postId));

        Comment comment = new Comment(request.content(), user, post);
        Comment savedComment = commentRepository.save(comment);

        return new CommentResponseDTO(
                savedComment.getId(),
                savedComment.getContent(),
                savedComment.getCreatedAt(),
                savedComment.getAuthor(),
                savedComment.getPost()
        );
    }
}
