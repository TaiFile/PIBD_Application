package pibd.application.domain.model;

import jakarta.persistence.*;
import pibd.application.domain.enums.ReactionType;
import pibd.application.domain.utils.ReactionUserCommentId;

@Entity
@Table(name = "comment_reactions")
public class ReactionUserComment {

    @EmbeddedId
    private ReactionUserCommentId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("commentId")
    @JoinColumn(name = "comment_id")
    private Comment comment;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ReactionType type;

    public ReactionUserComment() {
    }

    public ReactionUserComment(User user, Comment comment, ReactionType type) {
        this.user = user;
        this.comment = comment;
        this.type = type;
        this.id = new ReactionUserCommentId(user.getId(), comment.getId());
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
    }

    public Comment getComment() {
        return comment;
    }

    public void setComment(Comment comment) {
        this.comment = comment;
    }

    public ReactionType getType() {
        return type;
    }

    public void setType(ReactionType type) {
        this.type = type;
    }
}
