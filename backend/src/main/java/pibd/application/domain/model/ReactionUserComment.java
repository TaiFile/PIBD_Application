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

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo", nullable = false)
    private ReactionType type;

    @Column(name = "criado_em")
    private LocalDateTime createdAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("userId")
    @JoinColumn(name = "id_usuario")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("commentId")
    @JoinColumn(name = "id_comentario")
    private Comment comment;

    public ReactionUserComment() {
    }

    public ReactionUserComment(User user, Comment comment, ReactionType type) {
        this.user = user;
        this.comment = comment;
        this.type = type;
        this.id = new ReactionUserCommentId(user.getId(), comment.getId());
        this.createdAt = LocalDateTime.now();
    }

    public ReactionUserCommentId getId() {
        return id;
    }

    public void setId(ReactionUserCommentId id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
        if (this.id == null) {
            this.id = new ReactionUserCommentId();
        }
        this.id.setUserId(user.getId());
    }

    public Comment getComment() {
        return comment;
    }

    public void setComment(Comment comment) {
        this.comment = comment;
        if (this.id == null) {
            this.id = new ReactionUserCommentId();
        }
        this.id.setCommentId(comment.getId());
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
