package pibd.application.api.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import pibd.application.application.dto.CommentResponseDTO;
import pibd.application.application.dto.CreateCommentDTO;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api")
public class CommentController {
    @Autowired
    private ListCommentService listCommentService;

    @Autowired
    private CreateCommentService createCommentService;

    @PostMapping("/comments")
    public ResponseEntity<CommentResponseDTO> createComment(
            @RequestParam Long userId,
            @RequestParam Long postId,
            @Valid @RequestBody CreateCommentDTO request) {
        CommentResponseDTO createdComment = createCommentService.create(userId, postId, request);
        URI uri = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(createdComment.id())
                .toUri();

        return ResponseEntity.created(uri).body(createdComment);
    }

    @GetMapping("/comments")
    public ResponseEntity<List<CommentResponseDTO>> listComments(@RequestParam Long postId) {
        List<CommentResponseDTO> comments = listCommentService.findAllByPostId(postId);
        return ResponseEntity.ok(comments);
    }
}
