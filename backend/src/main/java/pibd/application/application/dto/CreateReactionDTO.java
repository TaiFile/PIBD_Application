package pibd.application.application.dto;

import jakarta.validation.constraints.NotNull;
import pibd.application.domain.enums.ReactionType;

public record CreateReactionDTO(
    @NotNull(message = "ID do usuário é obrigatório")
    Long id_usuario,
    
    @NotNull(message = "ID do post é obrigatório")
    Long id_post,
    
    @NotNull(message = "Tipo de reação é obrigatório")
    ReactionType tipo
) {
} 