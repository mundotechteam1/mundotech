package com.femcoders.mundotech.repository;

import com.femcoders.mundotech.entity.Article;
import com.femcoders.mundotech.entity.ArticleStatus;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {
    List<Article> findByStatus(ArticleStatus status);

    List<Article> findByAuthorId(Long authorId);

    }

public Article CreateArticle(Article article, Long authorId) {
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
   

public List<Article> getArticlesByAuthorId(Long authorId) {
        return articleRepository.findByAuthorId(authorId);
    }


public Article updateArticleContent(Long id, String newContent) {
    Article article = getArticlrById(id);
            if (!article.getAuthor().getId().equals(authorId)) {
        throw new RuntimeException("Only the author can update this article");
            }

    article.setContent(newContent);
    return articleRepository.save(article); 
}

 public Article sendForReview(Integer id, Long authorId) {
        Article article = getArticleById(id);
        if (!article.getAuthor().getId().equals(authorId)) {
            throw new RuntimeException("Only the author can send this article for review");
        }
        article.setStatus(ArticleStatus.IN_REVIEW);
        return articleRepository.save(article);
    }

    public Article approveArticle(Integer id, Long managerId) {
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




