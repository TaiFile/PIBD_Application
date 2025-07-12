package pibd.application.domain.model;

import jakarta.persistence.*;
import pibd.application.domain.enums.ReactionType;
import pibd.application.domain.utils.ReactionUserCommentId;

import java.time.LocalDateTime;

@Entity
@Table(name = "Reacao_Comentario")
public class ReactionUserComment {

    @EmbeddedId
    private ReactionUserCommentId id;

    @Column(name = "id_usuario", nullable = false)
    private Long userId;

    @Column(name = "id_comentario", nullable = false)
    private Long commentId;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo", nullable = false)
    private ReactionType type;

    @Column(name = "criado_em")
    private LocalDateTime createdAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("userId")
    @JoinColumn(name = "id_usuario", insertable = false, updatable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("commentId")
    @JoinColumn(name = "id_comentario", insertable = false, updatable = false)
    private Comment comment;

    public ReactionUserComment() {
    }

    public ReactionUserComment(User user, Comment comment, ReactionType type) {
        this.user = user;
        this.comment = comment;
        this.type = type;
        this.userId = user.getId();
        this.commentId = comment.getId();
        this.id = new ReactionUserCommentId(userId, commentId);
        this.createdAt = LocalDateTime.now();
    }

    public ReactionUserCommentId getId() {
        return id;
    }

    public void setId(ReactionUserCommentId id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getCommentId() {
        return commentId;
    }

    public void setCommentId(Long commentId) {
        this.commentId = commentId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
        this.userId = user.getId();
    }

    public Comment getComment() {
        return comment;
    }

    public void setComment(Comment comment) {
        this.comment = comment;
        this.commentId = comment.getId();
    }

    public ReactionType getType() {
        return type;
    }

    public void setType(ReactionType type) {
        this.type = type;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
