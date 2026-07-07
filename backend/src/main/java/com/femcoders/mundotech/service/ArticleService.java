package com.femcoders.mundotech.service;

import com.femcoders.mundotech.entity.Article;
import com.femcoders.mundotech.entity.ArticleStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ArticleService {

    Article createArticle(Article article, Integer authorId);

    List<Article> getAllArticles();

    Article getArticleById(Integer id);

    List<Article> getArticlesByAuthorId(Integer authorId);

    Article updateArticle(Integer articleId, Integer authorId, String content, String s);

    void deleteArticleById(Integer articleId, Integer authorId);

    Article sendForReview(Integer articleId, Integer authorId);

    Article approveArticle(Integer articleId, Integer managerId);

    List<Article> getArticlesByStatus(ArticleStatus status);
}

