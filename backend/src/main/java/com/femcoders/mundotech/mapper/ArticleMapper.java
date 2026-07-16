package com.femcoders.mundotech.mapper;

import com.femcoders.mundotech.dto.response.ArticleResponseDTO;
import com.femcoders.mundotech.entity.Article;
import org.springframework.stereotype.Component;

@Component
public class ArticleMapper {

    private final AuthorMapper authorMapper;

    public ArticleMapper(AuthorMapper authorMapper) {
        this.authorMapper = authorMapper;
    }

    public ArticleResponseDTO toResponse(Article article) {
        ArticleResponseDTO dto = new ArticleResponseDTO();

        dto.setId(article.getId());
        dto.setTitle(article.getTitle());
        dto.setContent(article.getContent());
        dto.setImage(article.getImage());
        dto.setStatus(article.getStatus() != null ? article.getStatus().name() : null);
        dto.setCreatedAt(article.getCreatedAt());
        dto.setPublishedAt(article.getPublishedAt());

        dto.setAuthor(authorMapper.toSummary(article.getAuthor()));

        return dto;
    }
}
