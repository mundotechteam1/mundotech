package com.femcoders.mundotech.service;

import com.femcoders.mundotech.entity.Article;
import com.femcoders.mundotech.entity.ArticleStatus;
import com.femcoders.mundotech.entity.User;
import com.femcoders.mundotech.repository.ArticleRepository;
import com.femcoders.mundotech.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ArticleServiceImpl implements ArticleService {

    private final ArticleRepository articleRepository;
    private final UserRepository userRepository;

    public ArticleServiceImpl(ArticleRepository articleRepository, UserRepository userRepository) {
        this.articleRepository = articleRepository;
        this.userRepository = userRepository;
    }

    @Override
    public Article createArticle(Article article, Integer authorId) {
        User author = userRepository.findById(authorId)
                .orElseThrow(() -> new RuntimeException("Author not found with id: " + authorId));

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
    public Article updateArticleContent(Integer articleId, Integer authorId, String content) {
        Article article = getArticleById(articleId);

        if (!article.getAuthor().getId().equals(authorId)) {
            throw new RuntimeException("Only the author can update this article");
        }

        article.setContent(content);
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

        User manager = userRepository.findById(managerId)
                .orElseThrow(() -> new RuntimeException("Manager not found with id: " + managerId));

        boolean isManager = manager.getRoles().stream()
                .anyMatch(role -> role.getName().equalsIgnoreCase("manager"));

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
