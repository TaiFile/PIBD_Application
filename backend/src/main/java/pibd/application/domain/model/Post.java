package pibd.application.domain.model;

import jakarta.persistence.*;
import pibd.application.domain.enums.Category;
import pibd.application.domain.enums.Status;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "Post")
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "id_usuario", nullable = false)
    private Long userId;

    @Column(name = "titulo", nullable = false)
    private String title;

    @Column(name = "texto")
    private String content;

    @Column(name = "descricao")
    private String description;

    @Column(name = "localizacao")
    private String location;

    @Column(name = "criado_em")
    private LocalDateTime createdAt;

    @Enumerated(EnumType.STRING)
    @Column(name = "categoria", nullable = false)
    private Category category;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private Status status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_usuario", insertable = false, updatable = false)
    private User user;

    @ElementCollection
    @CollectionTable(name = "Midia_Post", joinColumns = @JoinColumn(name = "id_post"))
    @Column(name = "url_midia", nullable = false)
    private Set<String> mediaUrls = new HashSet<>();

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<ReactionUserPost> reactions = new HashSet<>();

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Comment> comments = new HashSet<>();

    public Post() {
    }

    public Post(String title, String content, String description, String location, LocalDateTime createdAt, Category category, Status status, User user) {
        this.title = title;
        this.content = content;
        this.description = description;
        this.location = location;
        this.createdAt = createdAt;
        this.category = category;
        this.status = status;
        this.user = user;
        this.userId = user.getId();
    }

    public Set<ReactionUserPost> getReactions() {
        return reactions;
    }

    public void setReactions(Set<ReactionUserPost> reactions) {
        this.reactions = reactions;
    }

    public Set<Comment> getComments() {
        return comments;
    }

    public void setComments(Set<Comment> comments) {
        this.comments = comments;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
        this.userId = user.getId();
    }

    public Set<String> getMediaUrls() {
        return mediaUrls;
    }

    public void setMediaUrls(Set<String> mediaUrls) {
        this.mediaUrls = mediaUrls;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Post post = (Post) o;
        return id != null && Objects.equals(id, post.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}