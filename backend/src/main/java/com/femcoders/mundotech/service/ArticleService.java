package com.femcoders.mundotech.service;

import com.femcoders.mundotech.dto.request.ArticleRequestDTO;
import com.femcoders.mundotech.dto.response.ArticleResponseDTO;
import com.femcoders.mundotech.entity.enums.ArticleStatus;

import java.util.List;

public interface ArticleService {

    ArticleResponseDTO createArticle(ArticleRequestDTO dto);

    List<ArticleResponseDTO> getAllArticles();

    ArticleResponseDTO getArticleById(Integer id);

    List<ArticleResponseDTO> getArticlesByAuthorId(Integer authorId);

    ArticleResponseDTO updateArticle(Integer articleId, Integer authorId, String title, String content);

    void deleteArticleById(Integer articleId, Integer authorId);

    ArticleResponseDTO sendForReview(Integer articleId, Integer authorId);

    ArticleResponseDTO approveArticle(Integer articleId, Integer managerId);

    List<ArticleResponseDTO> getArticlesByStatus(ArticleStatus status);

    ArticleResponseDTO updateImage(Integer id, String imageUrl);
}
