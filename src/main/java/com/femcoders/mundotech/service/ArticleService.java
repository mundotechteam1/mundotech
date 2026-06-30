package com.femcoders.mundotech.service;

import com.femcoders.mundotech.entity.Article;
import com.femcoders.mundotech.entity.ArticleStatus;
import com.femcoders.mundotech.entity.User;
import com.femcoders.mundotech.repository.ArticleRepository;
import com.femcoders.mundotech.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ArticleService {

    private final ArticleRepository articleRepository;
    private final UserRepository userRepository;

    public ArticleService(ArticleRepository articleRepository, UserRepository userRepository) {
        this.articleRepository = articleRepository;
        this.userRepository = userRepository;
    }

    public Article createArticle(Article article, Long authorId) {
        User author = userRepository.findById(authorId)
                .orElseThrow(() -> new RuntimeException("Author not found with id: " + authorId));
        article.setAuthor(author);
        article.setStatus(ArticleStatus.DRAFT);
        return articleRepository.save(article);
    }

    public List<Article> getAllArticles() {
        return articleRepository.findAll();
    }

    public Article getArticleById(Long id) {
        return articleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Article not found with id: " + id));
    }

    public List<Article> getArticlesByAuthor(Long authorId) {
        return articleRepository.findByAuthorId(authorId);
    }

    public Article updateArticleContent(Long id, Long authorId, String content) {
        Article article = getArticleById(id);
        if (!article.getAuthor().getId().equals(authorId)) {
            throw new RuntimeException("Only the author can update this article");
        }
        article.setContent(content);
        return articleRepository.save(article);
    }

    public void deleteArticle(Long id, Long authorId) {
        Article article = getArticleById(id);
        if (!article.getAuthor().getId().equals(authorId)) {
            throw new RuntimeException("Only the author can delete this article");
        }
        articleRepository.delete(article);
    }

    public Article sendForReview(Long id, Long authorId) {
        Article article = getArticleById(id);
        if (!article.getAuthor().getId().equals(authorId)) {
            throw new RuntimeException("Only the author can send this article for review");
        }
        article.setStatus(ArticleStatus.IN_REVIEW);
        return articleRepository.save(article);
    }

    public Article approveArticle(Long id, Long managerId) {
        Article article = getArticleById(id);
        User manager = userRepository.findById(managerId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + managerId));

        boolean isManager = manager.getRoles().stream()
                .anyMatch(role -> role.getName().equals("manager"));

        if (!isManager) {
            throw new RuntimeException("Only a manager can approve articles");
        }

        article.setStatus(ArticleStatus.PUBLISHED);
        return articleRepository.save(article);
    }

    public List<Article> getArticlesByStatus(ArticleStatus status) {
        return articleRepository.findByStatus(status);
    }
}
