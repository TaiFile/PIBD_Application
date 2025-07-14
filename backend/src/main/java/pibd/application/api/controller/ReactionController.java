package pibd.application.api.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pibd.application.application.dto.CreateReactionDTO;
import pibd.application.application.service.CreateReactionService;

@RestController
@RequestMapping("/api")
public class ReactionController {
    
    @Autowired
    private CreateReactionService createReactionService;

    @PostMapping("/posts/reactions")
    public ResponseEntity<Object> createReaction(@Valid @RequestBody CreateReactionDTO request) {
        createReactionService.create(request);
        return ResponseEntity.ok().body(new Object() {
            public final boolean success = true;
        });
    }
} 