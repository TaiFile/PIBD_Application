package pibd.application.application.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pibd.application.application.dto.CreateReactionDTO;
import pibd.application.domain.model.Post;
import pibd.application.domain.model.ReactionUserPost;
import pibd.application.domain.model.User;
import pibd.application.infra.persistence.jpa.PostJpaRepository;
import pibd.application.infra.persistence.jpa.ReactionUserPostJpaRepository;
import pibd.application.infra.persistence.jpa.UserJpaRepository;

@Service
public class CreateReactionService {
    
    @Autowired
    private ReactionUserPostJpaRepository reactionRepository;
    
    @Autowired
    private UserJpaRepository userRepository;
    
    @Autowired
    private PostJpaRepository postRepository;

    public void create(CreateReactionDTO request) {
        User user = userRepository.findById(request.id_usuario())
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado com ID: " + request.id_usuario()));

        Post post = postRepository.findById(request.id_post())
                .orElseThrow(() -> new IllegalArgumentException("Post não encontrado com ID: " + request.id_post()));

        ReactionUserPost reaction = new ReactionUserPost(user, post, request.tipo());
        reactionRepository.save(reaction);
    }
} 