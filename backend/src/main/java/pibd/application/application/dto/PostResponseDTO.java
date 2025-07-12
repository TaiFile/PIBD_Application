package pibd.application.application.dto;

import pibd.application.domain.enums.Category;
import pibd.application.domain.enums.Status;
import pibd.application.domain.enums.ReactionType;
import java.time.LocalDateTime;
import java.util.Set;

public record PostResponseDTO(
        Long id,
        String title,
        String content,
        String description,
        Set<String> mediaUrls,
        LocalDateTime createdAt,
        String location,
        Status status,
        Category category,
        long reactionsCount,
        long commentsCount,
        ReactionType userReaction
) {
}

