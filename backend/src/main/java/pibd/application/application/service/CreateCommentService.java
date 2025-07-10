package pibd.application.application.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pibd.application.application.dto.CommentResponseDTO;
import pibd.application.application.dto.CreateCommentDTO;
import pibd.application.domain.model.Comment;
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
        userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado com ID: " + userId));
        postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("Post não encontrado com ID: " + postId));

        var comment = new Comment();
        comment.setUserId(userId);
        comment.setPostId(postId);
        comment.setContent(request.content());
        comment.setCreatedAt(new java.util.Date());

        var savedComment = commentRepository.save(comment);

        return new CommentResponseDTO(
                savedComment.getId(),
                savedComment.getUserId(),
                savedComment.getPostId(),
                savedComment.getContent(),
                savedComment.getCreatedAt()
        );
    }
}
