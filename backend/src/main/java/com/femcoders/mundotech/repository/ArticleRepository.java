package com.femcoders.mundotech.repository;

import com.femcoders.mundotech.entity.Article;
import com.femcoders.mundotech.entity.enums.ArticleStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Integer> {
    List<Article> findByAuthorId(Integer authorId);
    List<Article> findByStatus(ArticleStatus status);
}


