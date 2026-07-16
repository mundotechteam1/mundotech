package com.femcoders.mundotech.controller;
import com.femcoders.mundotech.dto.request.ArticleRequestDTO;
import com.femcoders.mundotech.dto.response.ArticleResponseDTO;
import com.femcoders.mundotech.entity.enums.ArticleStatus;
import com.femcoders.mundotech.service.ArticleService;
import com.femcoders.mundotech.service.ImageService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.MediaType; 
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/api/v1/articles")
@RequiredArgsConstructor
public class ArticleController {

    private final ArticleService articleService;
    private final ImageService imageService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ArticleResponseDTO> createArticle(
            @Valid @ModelAttribute ArticleRequestDTO dto) {

        ArticleResponseDTO created = articleService.createArticle(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PostMapping("/{id}/upload-image")
    public ResponseEntity<ArticleResponseDTO> uploadImage(
            @PathVariable Integer id,
            @RequestParam("file") MultipartFile file) {

        String imageUrl = imageService.saveImage(file);

        ArticleResponseDTO updated = articleService.updateImage(id, imageUrl);

        return ResponseEntity.ok(updated);
    }


    @GetMapping
    public ResponseEntity<List<ArticleResponseDTO>> getAllArticles() {
        return ResponseEntity.ok(articleService.getAllArticles());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ArticleResponseDTO> getArticleById(@PathVariable Integer id) {
        return ResponseEntity.ok(articleService.getArticleById(id));
    }

    @GetMapping("/author/{authorId}")
    public ResponseEntity<List<ArticleResponseDTO>> getArticlesByAuthorId(@PathVariable Integer authorId) {
        return ResponseEntity.ok(articleService.getArticlesByAuthorId(authorId));
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<ArticleResponseDTO>> getArticlesByStatus(@PathVariable ArticleStatus status) {
        return ResponseEntity.ok(articleService.getArticlesByStatus(status));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ArticleResponseDTO> updateArticle(
            @PathVariable Integer id,
            @Valid @RequestBody Map<String, String> body,
            @RequestParam Integer authorId) {

        String title = body.get("title");
        String content = body.get("content");

        ArticleResponseDTO updated = articleService.updateArticle(id, authorId, title, content);
        return ResponseEntity.ok(updated);
    }

    @PutMapping("/{id}/send-review")
    public ResponseEntity<ArticleResponseDTO> sendForReview(
            @PathVariable Integer id,
            @RequestParam Integer authorId) {
        ArticleResponseDTO updated = articleService.sendForReview(id, authorId);
        return ResponseEntity.ok(updated);
    }

    @PutMapping("/{id}/approve")
    public ResponseEntity<ArticleResponseDTO> approveArticle(
            @PathVariable Integer id,
            @RequestParam Integer managerId) {
        ArticleResponseDTO updated = articleService.approveArticle(id, managerId);
        return ResponseEntity.ok(updated);
    }

    @PutMapping("/{id}/reject")
    public ResponseEntity<ArticleResponseDTO> rejectArticle(
            @PathVariable Integer id,
            @RequestParam Integer managerId) {
        ArticleResponseDTO updated = articleService.rejectArticle(id, managerId);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteArticleById(
            @PathVariable Integer id,
            @RequestParam Integer authorId) {
        articleService.deleteArticleById(id, authorId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}/image")
    public ResponseEntity<ArticleResponseDTO> deleteArticleImage(
            @PathVariable Integer id,
            @RequestParam Integer authorId) {
        ArticleResponseDTO updated = articleService.deleteArticleImage(id, authorId);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}/manager")
    public ResponseEntity<Void> deleteArticleByManager(
            @PathVariable Integer id,
            @RequestParam Integer managerId) {
        articleService.deleteArticleByManager(id, managerId);
        return ResponseEntity.noContent().build();
    }
}
