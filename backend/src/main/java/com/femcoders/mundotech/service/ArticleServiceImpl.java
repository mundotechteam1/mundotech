package com.femcoders.mundotech.service;

import com.femcoders.mundotech.entity.Article;
import com.femcoders.mundotech.entity.enums.ArticleStatus;
import com.femcoders.mundotech.entity.User;
import com.femcoders.mundotech.repository.ArticleRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ArticleServiceImpl implements ArticleService {

    private final ArticleRepository articleRepository;
    private final UserService userService;

    public ArticleServiceImpl(ArticleRepository articleRepository, UserService userService) {
        this.articleRepository = articleRepository;
        this.userService = userService;
    }

    @Override
    public Article createArticle(Article article, Integer authorId) {
        User author = userService.getUserById(authorId);
        article.setAuthor(author);
        article.setStatus(ArticleStatus.DRAFT);
        return articleRepository.save(article);
    }

    @Override
    public List<Article> getAllArticles() {
        return articleRepository.findAll();
    }

    @Override
    public Article getArticleById(Integer id) {
        return articleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Article not found with id: " + id));    }

    @Override
    public List<Article> getArticlesByAuthorId(Integer authorId) {
        return articleRepository.findByAuthorId(authorId);
    }

    @Override
    public Article updateArticle(Integer id, Integer authorId, String title, String content) {

        Article article = articleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Article not found"));

        if (!article.getAuthor().getId().equals(authorId)) {
            throw new RuntimeException("You are not the author of this article");
        }

        if (title != null) {
            article.setTitle(title);
        }

        if (content != null) {
            article.setContent(content);
        }

        return articleRepository.save(article);
    }

    @Override
    public void deleteArticleById(Integer articleId, Integer authorId) {
        Article article = getArticleById(articleId);

        if (!article.getAuthor().getId().equals(authorId)) {
            throw new RuntimeException("Only the author can delete this article");
        }

        articleRepository.delete(article);
    }

    @Override
    public Article sendForReview(Integer articleId, Integer authorId) {
        Article article = getArticleById(articleId);

        if (!article.getAuthor().getId().equals(authorId)) {
            throw new RuntimeException("Only the author can send this article for review");
        }

        if (article.getStatus() != ArticleStatus.DRAFT) {
            throw new RuntimeException("Only DRAFT articles can be sent for review");
        }

        article.setStatus(ArticleStatus.IN_REVIEW);
        return articleRepository.save(article);
    }

    @Override
    public Article approveArticle(Integer articleId, Integer managerId) {
        Article article = getArticleById(articleId);

        User manager = userService.getUserById(managerId);

        boolean isManager = manager.getRoles().stream()
                .anyMatch(role -> role.getName().equalsIgnoreCase("MANAGER"));

        if (!isManager) {
            throw new RuntimeException("Only a manager can approve articles");
        }

        if (article.getStatus() != ArticleStatus.IN_REVIEW) {
            throw new RuntimeException("Only articles in review can be approved");
        }

        article.setStatus(ArticleStatus.PUBLISHED);
        article.setPublishedAt(LocalDateTime.now());

        return articleRepository.save(article);
    }

    @Override
    public List<Article> getArticlesByStatus(ArticleStatus status) {
        return articleRepository.findByStatus(status);
    }

}
