package pibd.application.application.dto;

import java.time.LocalDateTime;

public record CommentResponseDTO (
        Long id,
        String content,
        LocalDateTime createdAt
){
}
