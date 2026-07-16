package com.femcoders.mundotech.service;

import com.femcoders.mundotech.dto.request.ArticleRequestDTO;
import com.femcoders.mundotech.dto.response.ArticleResponseDTO;
import com.femcoders.mundotech.entity.Article;
import com.femcoders.mundotech.entity.enums.ArticleStatus;
import com.femcoders.mundotech.entity.User;
import com.femcoders.mundotech.mapper.ArticleMapper;
import com.femcoders.mundotech.repository.ArticleRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ArticleServiceImpl implements ArticleService {

    private final ArticleRepository articleRepository;
    private final UserService userService;
    private final ArticleMapper articleMapper;
    private final ImageService imageService; 

    public ArticleServiceImpl(
            ArticleRepository articleRepository,
            UserService userService,
            ArticleMapper articleMapper,
            ImageService imageService
    ) {
        this.articleRepository = articleRepository;
        this.userService = userService;
        this.articleMapper = articleMapper;
        this.imageService = imageService;
    }

    @Override
    public ArticleResponseDTO createArticle(ArticleRequestDTO dto) {

        User author = userService.getUserEntityById(dto.getAuthorId());
        Article article = new Article();

        article.setTitle(dto.getTitle());
        article.setContent(dto.getContent());
        article.setAuthor(author);
        article.setStatus(ArticleStatus.DRAFT);

        if (dto.getImage() != null && !dto.getImage().isEmpty()) {
            String imagePath = imageService.saveImage(dto.getImage());
            article.setImage(imagePath);
        }


        Article saved = articleRepository.save(article);
        return articleMapper.toResponse(saved);
    }

    @Override
    public List<ArticleResponseDTO> getAllArticles() {
        return articleRepository.findAll()
                .stream()
                .map(articleMapper::toResponse)
                .toList();
    }

    @Override
    public ArticleResponseDTO getArticleById(Integer id) {
        Article article = articleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Article not found"));
        return articleMapper.toResponse(article);
    }

    @Override
    public List<ArticleResponseDTO> getArticlesByAuthorId(Integer authorId) {
        return articleRepository.findByAuthorId(authorId)
                .stream()
                .map(articleMapper::toResponse)
                .toList();
    }

    @Override
    public ArticleResponseDTO updateArticle(Integer id, Integer authorId, String title, String content) {

        Article article = articleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Article not found"));

        if (!article.getAuthor().getId().equals(authorId)) {
            throw new RuntimeException("You are not the author of this article");
        }

        if (title != null) article.setTitle(title);
        if (content != null) article.setContent(content);

        Article saved = articleRepository.save(article);
        return articleMapper.toResponse(saved);
    }

    @Override
    public void deleteArticleById(Integer articleId, Integer authorId) {
        Article article = articleRepository.findById(articleId)
                .orElseThrow(() -> new RuntimeException("Article not found"));

        if (!article.getAuthor().getId().equals(authorId)) {
            throw new RuntimeException("Only the author can delete this article");
        }

        articleRepository.delete(article);
    }

    @Override
    public void deleteArticleByManager(Integer articleId, Integer managerId) {
        Article article = articleRepository.findById(articleId)
                .orElseThrow(() -> new RuntimeException("Article not found"));

        User manager = userService.getUserEntityById(managerId);

        boolean isManager = manager.getRoles().stream()
                .anyMatch(role -> role.getName().equalsIgnoreCase("MANAGER"));

        if (!isManager) {
            throw new RuntimeException("Only a manager can delete articles this way");
        }

        articleRepository.delete(article);
    }

    @Override
    public ArticleResponseDTO sendForReview(Integer articleId, Integer authorId) {
        Article article = getArticleEntity(articleId);

        if (!article.getAuthor().getId().equals(authorId)) {
            throw new RuntimeException("Only the author can send this article for review");
        }

        if (article.getStatus() != ArticleStatus.DRAFT) {
            throw new RuntimeException("Only DRAFT articles can be sent for review");
        }

        article.setStatus(ArticleStatus.IN_REVIEW);
        Article saved = articleRepository.save(article);

        return articleMapper.toResponse(saved);
    }

    @Override
    public ArticleResponseDTO approveArticle(Integer articleId, Integer managerId) {
        Article article = getArticleEntity(articleId);

        User manager = userService.getUserEntityById(managerId);

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

        Article saved = articleRepository.save(article);
        return articleMapper.toResponse(saved);
    }

    @Override
    public ArticleResponseDTO rejectArticle(Integer articleId, Integer managerId) {
        Article article = getArticleEntity(articleId);

        User manager = userService.getUserEntityById(managerId);

        boolean isManager = manager.getRoles().stream()
                .anyMatch(role -> role.getName().equalsIgnoreCase("MANAGER"));

        if (!isManager) {
            throw new RuntimeException("Only a manager can reject articles");
        }

        if (article.getStatus() != ArticleStatus.IN_REVIEW) {
            throw new RuntimeException("Only articles in review can be rejected");
        }

        article.setStatus(ArticleStatus.DRAFT);

        Article saved = articleRepository.save(article);
        return articleMapper.toResponse(saved);
    }

    @Override
    public List<ArticleResponseDTO> getArticlesByStatus(ArticleStatus status) {
        return articleRepository.findByStatus(status)
                .stream()
                .map(articleMapper::toResponse)
                .toList();
    }

    private Article getArticleEntity(Integer id) {
        return articleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Article not found"));
    }

    @Override
    public ArticleResponseDTO updateImage(Integer id, String imageUrl) {
        Article article = getArticleEntity(id);
        article.setImage(imageUrl); // CORREGIDO: Vuelve a su estado original (String)
        Article saved = articleRepository.save(article);
        return articleMapper.toResponse(saved);
    }
}
