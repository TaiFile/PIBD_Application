package pibd.application.api.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import pibd.application.application.dto.CreatePostDTO;
import pibd.application.application.dto.PostResponseDTO;
import pibd.application.application.service.CreatePostService;

import java.net.URI;

@RestController
@RequestMapping("/posts")
public class PostController {

    @Autowired
    private CreatePostService createPostService;

    @PostMapping
    public ResponseEntity<PostResponseDTO> create(@PathVariable Long userId,
                                                  @Valid @RequestBody CreatePostDTO request) {
        PostResponseDTO createdPost = createPostService.create(userId, request);
        URI uri = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(createdPost.id())
                .toUri();

        return ResponseEntity.created(uri).body(createdPost);
    }

    /**
     * Endpoint para buscar um post pelo seu ID.
     * Retorna o post encontrado ou um erro 404 (Not Found) se não existir.
     */
//    @GetMapping("/{id}")
//    public ResponseEntity<PostResponseDTO> getById(@PathVariable Long id) {
//        PostResponseDTO post = createPostService.findById(id);
//        return ResponseEntity.ok(post);
//    }
//
//    /**
//     * Endpoint para listar todos os posts.
//     * Ideal para feeds ou páginas de listagem.
//     */
//    @GetMapping
//    public ResponseEntity<List<PostResponseDTO>> getAll() {
//        List<PostResponseDTO> posts = createPostService.findAll();
//        return ResponseEntity.ok(posts);
//    }
//
//    /**
//     * Endpoint para atualizar um post existente.
//     * Recebe o ID do post e um DTO com os dados a serem atualizados.
//     */
//    @PutMapping("/{id}")
//    public ResponseEntity<PostResponseDTO> update(@PathVariable Long id, @Valid @RequestBody UpdatePostDTO postDTO) {
//        PostResponseDTO updatedPost = createPostService.update(id, postDTO);
//        return ResponseEntity.ok(updatedPost);
//    }
//
//    /**
//     * Endpoint para deletar um post.
//     * Retorna o status 204 (No Content) para indicar sucesso na remoção.
//     */
//    @DeleteMapping("/{id}")
//    public ResponseEntity<Void> delete(@PathVariable Long id) {
//        createPostService.delete(id);
//        return ResponseEntity.noContent().build();
//    }
}
