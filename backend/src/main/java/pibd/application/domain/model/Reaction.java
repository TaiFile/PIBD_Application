package pibd.application.domain.model;

import jakarta.persistence.*;
import pibd.application.domain.enums.ReactionType;

import java.util.Objects;

@Entity
@Table(name = "reactions")
public class Reaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "post_id")
    private Post post;

    @ManyToOne
    @JoinColumn(name = "comment_id")
    private Comment comment;

    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false)
    private ReactionType type;

    public Reaction() {
    }

    public Reaction(User user, Post post, ReactionType type) {
        this.user = user;
        this.post = post;
        this.type = type;
    }

    public Reaction(User user, Comment comment, ReactionType type) {
        this.user = user;
        this.comment = comment;
        this.type = type;
    }

    public Comment getComment() {
        return comment;
    }

    public void setComment(Comment comment) {
        this.comment = comment;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Post getPost() {
        return post;
    }

    public void setPost(Post post) {
        this.post = post;
    }

    public ReactionType getType() {
        return type;
    }

    public void setType(ReactionType type) {
        this.type = type;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        Reaction reaction = (Reaction) o;
        return Objects.equals(getId(), reaction.getId()) && Objects.equals(getUser(), reaction.getUser()) && Objects.equals(getPost(), reaction.getPost()) && Objects.equals(getComment(), reaction.getComment()) && getType() == reaction.getType();
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getUser(), getPost(), getComment(), getType());
    }
}
