package com.femcoders.mundotech.service;

import com.femcoders.mundotech.entity.Article;
import com.femcoders.mundotech.entity.ArticleStatus;
import com.femcoders.mundotech.entity.User;
import com.femcoders.mundotech.repository.ArticleRepository;
import com.femcoders.mundotech.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ArticleService {

    Article createArticle(Article article, Integer authorId);

    List<Article> getAllArticles();

    Article getArticleById(Integer id);

    List<Article> getArticlesByAuthorId(Integer authorId);

    Article updateArticle(Integer articleId, Integer authorId, String content);

    void deleteArticleById(Integer articleId, Integer authorId);

    Article sendForReview(Integer articleId, Integer authorId);

    Article approveArticle(Integer articleId, Integer managerId);

    List<Article> getArticlesByStatus(ArticleStatus status);
}

