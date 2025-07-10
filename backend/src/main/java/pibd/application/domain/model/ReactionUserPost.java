// Reaction.java
package pibd.application.domain.model;

import jakarta.persistence.*;
import pibd.application.domain.enums.ReactionType;
import pibd.application.domain.utils.ReactionUserPostId;

@Entity
@Table(name = "reactions")
public class ReactionUserPost {

    @EmbeddedId
    private ReactionUserPostId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("postId")
    @JoinColumn(name = "post_id")
    private Post post;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ReactionType type;

    public ReactionUserPost() {
    }

    public ReactionUserPost(User user, Post post, ReactionType type) {
        this.user = user;
        this.post = post;
        this.type = type;
        this.id = new ReactionUserPostId(user.getId(), post.getId());
    }

    // Getters e Setters
    public ReactionUserPostId getId() {
        return id;
    }

    public void setId(ReactionUserPostId id) {
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
}