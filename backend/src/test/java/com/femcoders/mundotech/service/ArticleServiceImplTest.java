package com.femcoders.mundotech.service;

import com.femcoders.mundotech.dto.request.ArticleRequestDTO;
import com.femcoders.mundotech.dto.response.ArticleResponseDTO;
import com.femcoders.mundotech.entity.Article;
import com.femcoders.mundotech.entity.User;
import com.femcoders.mundotech.entity.enums.ArticleStatus;
import com.femcoders.mundotech.mapper.ArticleMapper;
import com.femcoders.mundotech.repository.ArticleRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ArticleServiceImplTest {

    @Mock
    private ArticleRepository articleRepository;

    @Mock
    private UserService userService;

    @Mock
    private ArticleMapper articleMapper;

    @InjectMocks
    private ArticleServiceImpl articleService;


    @Test
    void shouldCreateArticle() {
        ArticleRequestDTO dto = new ArticleRequestDTO();
        dto.setTitle("Title");
        dto.setContent("Content");
        dto.setAuthorId(1);

        User author = new User();
        author.setId(1);

        when(userService.getUserEntityById(1)).thenReturn(author);

        Article saved = new Article();
        saved.setId(10);
        saved.setTitle("Title");
        saved.setContent("Content");
        saved.setAuthor(author);
        saved.setStatus(ArticleStatus.DRAFT);

        when(articleRepository.save(any(Article.class))).thenReturn(saved);

        ArticleResponseDTO response = new ArticleResponseDTO();
        response.setId(10);
        when(articleMapper.toResponse(saved)).thenReturn(response);

        ArticleResponseDTO result = articleService.createArticle(dto);

        assertEquals(10, result.getId());
    }

    @Test
    void shouldReturnAllArticles() {
        Article a1 = new Article();
        a1.setId(1);
        Article a2 = new Article();
        a2.setId(2);

        when(articleRepository.findAll()).thenReturn(List.of(a1, a2));

        ArticleResponseDTO r1 = new ArticleResponseDTO();
        r1.setId(1);
        ArticleResponseDTO r2 = new ArticleResponseDTO();
        r2.setId(2);

        when(articleMapper.toResponse(a1)).thenReturn(r1);
        when(articleMapper.toResponse(a2)).thenReturn(r2);

        List<ArticleResponseDTO> result = articleService.getAllArticles();

        assertEquals(2, result.size());
    }

    @Test
    void shouldReturnArticleById() {
        Article article = new Article();
        article.setId(5);

        when(articleRepository.findById(5)).thenReturn(Optional.of(article));

        ArticleResponseDTO response = new ArticleResponseDTO();
        response.setId(5);

        when(articleMapper.toResponse(article)).thenReturn(response);

        ArticleResponseDTO result = articleService.getArticleById(5);

        assertEquals(5, result.getId());
    }

    @Test
    void shouldReturnArticlesByAuthorId() {
        Article a1 = new Article();
        a1.setId(1);

        when(articleRepository.findByAuthorId(3)).thenReturn(List.of(a1));

        ArticleResponseDTO r1 = new ArticleResponseDTO();
        r1.setId(1);

        when(articleMapper.toResponse(a1)).thenReturn(r1);

        List<ArticleResponseDTO> result = articleService.getArticlesByAuthorId(3);

        assertEquals(1, result.size());
        assertEquals(1, result.get(0).getId());
    }

    @Test
    void shouldUpdateArticle() {
        User author = new User();
        author.setId(1);

        Article article = new Article();
        article.setId(10);
        article.setAuthor(author);
        article.setTitle("Old");
        article.setContent("Old content");

        when(articleRepository.findById(10)).thenReturn(Optional.of(article));

        Article saved = new Article();
        saved.setId(10);
        saved.setTitle("New");
        saved.setContent("New content");
        saved.setAuthor(author);

        when(articleRepository.save(article)).thenReturn(saved);

        ArticleResponseDTO response = new ArticleResponseDTO();
        response.setId(10);
        when(articleMapper.toResponse(saved)).thenReturn(response);

        ArticleResponseDTO result = articleService.updateArticle(10, 1, "New", "New content");

        assertEquals(10, result.getId());
    }

    @Test
    void shouldFailUpdateIfNotAuthor() {
        User author = new User();
        author.setId(1);

        Article article = new Article();
        article.setId(10);
        article.setAuthor(author);

        when(articleRepository.findById(10)).thenReturn(Optional.of(article));

        assertThrows(RuntimeException.class,
                () -> articleService.updateArticle(10, 99, "New", "New content"));
    }

    @Test
    void shouldDeleteArticle() {
        User author = new User();
        author.setId(1);

        Article article = new Article();
        article.setId(10);
        article.setAuthor(author);

        when(articleRepository.findById(10)).thenReturn(Optional.of(article));

        articleService.deleteArticleById(10, 1);

        verify(articleRepository).delete(article);
    }

    @Test
    void shouldFailDeleteIfNotAuthor() {
        User author = new User();
        author.setId(1);

        Article article = new Article();
    }
}