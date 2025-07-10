package pibd.application.application.dto;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import pibd.application.domain.enums.Category;

import java.util.Set;

public record CreatePostDTO(
        @NotBlank(message = "O título é obrigatório.")
        @Size(min = 5, max = 100, message = "O título deve ter entre 5 e 100 caracteres.")
        String title,

        @NotBlank(message = "O conteúdo é obrigatório.")
        @Size(max = 1000, message = "O conteúdo não pode exceder 1000 caracteres.")
        String content,

        @NotBlank(message = "A descrição é obrigatória.")
        @Size(max = 255, message = "A descrição não pode exceder 255 caracteres.")
        String description,

        @NotBlank(message = "A localidade é obrigatória.")
        String locality,

        @NotNull(message = "A categoria é obrigatória.")
        Category category,

        Set<String>mediaUrls
) {
}
