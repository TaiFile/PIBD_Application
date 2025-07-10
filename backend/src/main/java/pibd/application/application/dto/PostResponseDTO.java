package pibd.application.application.dto;

import pibd.application.domain.enums.Category;
import pibd.application.domain.enums.Status;
import java.util.Date;
import java.util.Set;

public record PostResponseDTO(
        Long id,
        String title,
        String content,
        String description,
        Set<String> mediaUrls,
        Date createdAt,
        String locality,
        Status status,
        Category category,
        long reactionsCount,
        long commentsCount
) {
}

