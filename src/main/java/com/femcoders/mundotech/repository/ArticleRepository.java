package com.femcoders.mundotech.repository;
import com.femcoders.mundotech.entity.Article;
import org.springframework.data.jpa.repository.JpaRepository;           
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {
    List<Article> findByStatus(ArticleStatus status);   
    List <Article> findByAuthorId(Long authorId);



}
