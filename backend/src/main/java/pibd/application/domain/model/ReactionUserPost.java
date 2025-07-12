// Reaction.java
package pibd.application.domain.model;

import jakarta.persistence.*;
import pibd.application.domain.enums.ReactionType;
import pibd.application.domain.utils.ReactionUserPostId;

import java.time.LocalDateTime;

@Entity
@Table(name = "Reacao_Post")
public class ReactionUserPost {

    @EmbeddedId
    private ReactionUserPostId id;

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
    @MapsId("postId")
    @JoinColumn(name = "id_post")
    private Post post;

    public ReactionUserPost() {
    }

    public ReactionUserPost(User user, Post post, ReactionType type) {
        this.user = user;
        this.post = post;
        this.type = type;
        this.id = new ReactionUserPostId(user.getId(), post.getId());
        this.createdAt = LocalDateTime.now();
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
        if (this.id == null) {
            this.id = new ReactionUserPostId();
        }
        this.id.setUserId(user.getId());
    }

    public Post getPost() {
        return post;
    }

    public void setPost(Post post) {
        this.post = post;
        if (this.id == null) {
            this.id = new ReactionUserPostId();
        }
        this.id.setPostId(post.getId());
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