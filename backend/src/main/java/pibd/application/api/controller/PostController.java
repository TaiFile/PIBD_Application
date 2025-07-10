package pibd.application.api.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import pibd.application.application.dto.CreatePostDTO;
import pibd.application.application.dto.PostResponseDTO;
import pibd.application.application.service.CreatePostService;
import pibd.application.application.service.ListPostService;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api")
public class PostController {
    @Autowired
    private ListPostService listPostService;

    @Autowired
    private CreatePostService createPostService;

    @PostMapping("/posts")
    public ResponseEntity<PostResponseDTO> createPost(
            @RequestParam Long userId,
            @Valid @RequestBody CreatePostDTO request) {
        PostResponseDTO createdPost = createPostService.create(userId, request);
        URI uri = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(createdPost.id())
                .toUri();

        return ResponseEntity.created(uri).body(createdPost);
    }

    @GetMapping("/posts")
    public ResponseEntity<List<PostResponseDTO>> listPosts() {
        List<PostResponseDTO> posts = listPostService.findAll();
        return ResponseEntity.ok(posts);
    }
}
