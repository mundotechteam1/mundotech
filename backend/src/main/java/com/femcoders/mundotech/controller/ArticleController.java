package com.femcoders.mundotech.controller;
import com.femcoders.mundotech.entity.Article;
import com.femcoders.mundotech.entity.enums.ArticleStatus;
import com.femcoders.mundotech.service.ArticleService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/api/v1/articles")
@CrossOrigin(origin = "http://localhost:5173")
public class ArticleController {

    private final ArticleService articleService;

    public ArticleController(ArticleService articleService) {
        this.articleService = articleService;
    }

    @PostMapping
    public ResponseEntity<Article> createArticle(
            @Valid @RequestBody Article article) {

        Integer authorId = article.getAuthor().getId();
        Article created = articleService.createArticle(article, authorId);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @GetMapping
    public ResponseEntity<List<Article>> getAllArticles() {
        return ResponseEntity.ok(articleService.getAllArticles());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Article> getArticleById(@PathVariable Integer id) {
        return ResponseEntity.ok(articleService.getArticleById(id));
    }

    @GetMapping("/author/{authorId}")
    public ResponseEntity<List<Article>> getArticlesByAuthorId(@PathVariable Integer authorId) {
        return ResponseEntity.ok(articleService.getArticlesByAuthorId(authorId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Article> updateArticle(
            @PathVariable Integer id,
            @Valid @RequestBody Map<String, String> body,
            @RequestParam Integer authorId) {

        String title = body.get("title");
        String content = body.get("content");

        Article updated = articleService.updateArticle(id, authorId, title, content);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteArticleById(
            @PathVariable Integer id,
            @RequestParam Integer authorId) {
        articleService.deleteArticleById(id, authorId);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}/send-review")
    public ResponseEntity<Article> sendForReview(
            @PathVariable Integer id,
            @RequestParam Integer authorId) {
        Article updated = articleService.sendForReview(id, authorId);
        return ResponseEntity.ok(updated);
    }

    @PutMapping("/{id}/approve")
    public ResponseEntity<Article> approveArticle(
            @PathVariable Integer id,
            @RequestParam Integer managerId) {
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


