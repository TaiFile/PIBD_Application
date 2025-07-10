package pibd.application.application.dto;
import pibd.application.domain.model.Post;
import pibd.application.domain.model.User;

import java.util.Date;

public record CommentResponseDTO (
        Long id,
        String content,
        Date createdAt
){
}
