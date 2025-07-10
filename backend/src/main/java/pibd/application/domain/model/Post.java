package pibd.application.domain.model;

import jakarta.persistence.*;
import pibd.application.domain.enums.Category;
import pibd.application.domain.enums.Status;

import java.util.Date;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "posts")
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, length = 1000)
    private String content;

    @Column(nullable = false)
    private String description;

    @ElementCollection
    @CollectionTable(name = "post_media_urls", joinColumns = @JoinColumn(name = "post_id"))
    @Column(name = "url", nullable = false)
    private Set<String> mediaUrls = new HashSet<>();

    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = false)
    private Date createdAt;

    @Column
    private String locality;

    @Enumerated(EnumType.STRING)
    @Column
    private Status status;

    @Enumerated(EnumType.STRING)
    @Column
    private Category category;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<ReactionUserPost> reactions = new HashSet<>();

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Comment> comments = new HashSet<>();

    public Post() {
    }

    public Post(String title, String content, String description, Set<String> mediaUrls, Date createdAt, String locality, Status status, Category category, User user) {
        this.title = title;
        this.content = content;
        this.description = description;
        this.mediaUrls = mediaUrls;
        this.createdAt = createdAt;
        this.locality = locality;
        this.status = status;
        this.category = category;
        this.user = user;
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

    public Set<String> getMediaUrls() {
        return mediaUrls;
    }

    public void setMediaUrls(Set<String> mediaUrls) {
        this.mediaUrls = mediaUrls;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public String getLocality() {
        return locality;
    }

    public void setLocality(String locality) {
        this.locality = locality;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
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