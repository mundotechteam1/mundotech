package com.femcoders.mundotech.controller;
import com.femcoders.mundotech.entity.Article;
import com.femcoders.mundotech.entity.ArticleStatus;
import com.femcoders.mundotech.service.ArticleService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/api/articles")
public class ArticleController {

    private final ArticleService articleService;

    public ArticleController(ArticleService articleService) {
        this.articleService = articleService;
    }

    @PostMapping
    public ResponseEntity<Article> createArticle(@Valid @RequestBody Article article,
                                                  @RequestParam Long authorId) {
        Article created = articleService.createArticle(article, authorId);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }
     @GetMapping
    public ResponseEntity<List<Article>> getAllArticles() {
        return ResponseEntity.ok(articleService.getAllArticles());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Article> getArticleById(@PathVariable Long id) {
        return ResponseEntity.ok(articleService.getArticleById(id));
    }

    @GetMapping("/author/{authorId}")
    public ResponseEntity<List<Article>> getArticlesByAuthor(@PathVariable Long authorId) {
        return ResponseEntity.ok(articleService.getArticlesByAuthor(authorId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Article> updateArticle(@PathVariable Long id,
                                                  @RequestBody Map<String, String> body,
                                                  @RequestParam Long authorId) {
        String content = body.get("content");
        Article updated = articleService.updateArticleContent(id, authorId, content);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteArticle(@PathVariable Long id,
                                               @RequestParam Long authorId) {
        articleService.deleteArticle(id, authorId);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}/send-review")
    public ResponseEntity<Article> sendForReview(@PathVariable Long id,
                                                  @RequestParam Long authorId) {
        Article updated = articleService.sendForReview(id, authorId);
        return ResponseEntity.ok(updated);
    }

    @PutMapping("/{id}/approve")
    public ResponseEntity<Article> approveArticle(@PathVariable Long id,
                                                   @RequestParam Long managerId) {
        Article updated = articleService.approveArticle(id, managerId);
        return ResponseEntity.ok(updated);
    }

    @GetMapping("/status/draft")
    public ResponseEntity<List<Article>> getDraftArticles() {
        return ResponseEntity.ok(articleService.getArticlesByStatus(ArticleStatus.DRAFT));
    }

    @GetMapping("/status/in-review")
    public ResponseEntity<List<Article>> getInReviewArticles() {
        return ResponseEntity.ok(articleService.getArticlesByStatus(ArticleStatus.IN_REVIEW));
    }

    @GetMapping("/status/published")
    public ResponseEntity<List<Article>> getPublishedArticles() {
        return ResponseEntity.ok(articleService.getArticlesByStatus(ArticleStatus.PUBLISHED));
    }
}


