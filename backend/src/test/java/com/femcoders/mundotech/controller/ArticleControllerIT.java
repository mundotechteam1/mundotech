package com.femcoders.mundotech.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.femcoders.mundotech.TestSecurityConfig;
import com.femcoders.mundotech.dto.request.ArticleRequestDTO;
import com.femcoders.mundotech.entity.User;
import com.femcoders.mundotech.repository.UserRepository;
import com.femcoders.mundotech.service.ImageService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc(addFilters = false)
class ArticleControllerIT {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private ImageService imageService;

    private Integer authorId;

    @BeforeEach
    void setup() {
        userRepository.deleteAll();

        User author = new User();
        author.setName("Aida");
        author.setEmail("aida@test.com");
        author.setPassword("123456");

        authorId = userRepository.save(author).getId();
    }

    @Test
    void shouldCreateArticle() throws Exception {
        ArticleRequestDTO dto = new ArticleRequestDTO();
        dto.setTitle("Mi artículo");
        dto.setContent("Contenido");
        dto.setAuthorId(authorId);

        mockMvc.perform(post("/api/v1/articles")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.title").value("Mi artículo"))
                .andExpect(jsonPath("$.content").value("Contenido"))
                .andExpect(jsonPath("$.author.id").value(authorId));
    }

    @Test
    void shouldGetArticleById() throws Exception {
        ArticleRequestDTO dto = new ArticleRequestDTO();
        dto.setTitle("Mi artículo");
        dto.setContent("Contenido");
        dto.setAuthorId(authorId);

        String response = mockMvc.perform(post("/api/v1/articles")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto)))
                .andReturn()
                .getResponse()
                .getContentAsString();

        Integer articleId = objectMapper.readTree(response).get("id").asInt();

        mockMvc.perform(get("/api/v1/articles/" + articleId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(articleId))
                .andExpect(jsonPath("$.title").value("Mi artículo"));
    }

    @Test
    void shouldGetAllArticles() throws Exception {
        ArticleRequestDTO dto = new ArticleRequestDTO();
        dto.setTitle("Mi artículo");
        dto.setContent("Contenido");
        dto.setAuthorId(authorId);

        mockMvc.perform(post("/api/v1/articles")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isCreated());

        mockMvc.perform(get("/api/v1/articles"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(1));
    }

    @Test
    void shouldGetArticlesByAuthor() throws Exception {
        ArticleRequestDTO dto = new ArticleRequestDTO();
        dto.setTitle("Mi artículo");
        dto.setContent("Contenido");
        dto.setAuthorId(authorId);

        mockMvc.perform(post("/api/v1/articles")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isCreated());

        mockMvc.perform(get("/api/v1/articles/author/" + authorId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(1));
    }

    @Test
    void shouldGetArticlesByStatus() throws Exception {
        ArticleRequestDTO dto = new ArticleRequestDTO();
        dto.setTitle("Mi artículo");
        dto.setContent("Contenido");
        dto.setAuthorId(authorId);

        mockMvc.perform(post("/api/v1/articles")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isCreated());

        mockMvc.perform(get("/api/v1/articles/status/DRAFT"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(1));
    }

    @Test
    void shouldUpdateArticle() throws Exception {
        ArticleRequestDTO dto = new ArticleRequestDTO();
        dto.setTitle("Mi artículo");
        dto.setContent("Contenido");
        dto.setAuthorId(authorId);

        String response = mockMvc.perform(post("/api/v1/articles")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto)))
                .andReturn()
                .getResponse()
                .getContentAsString();

        Integer articleId = objectMapper.readTree(response).get("id").asInt();

        mockMvc.perform(put("/api/v1/articles/" + articleId)
                        .param("authorId", authorId.toString())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                        {"title":"Nuevo título","content":"Nuevo contenido"}
                        """))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("Nuevo título"))
                .andExpect(jsonPath("$.content").value("Nuevo contenido"));
    }

    @Test
    void shouldSendForReview() throws Exception {
        ArticleRequestDTO dto = new ArticleRequestDTO();
        dto.setTitle("Mi artículo");
        dto.setContent("Contenido");
        dto.setAuthorId(authorId);

        String response = mockMvc.perform(post("/api/v1/articles")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto)))
                .andReturn()
                .getResponse()
                .getContentAsString();

        Integer articleId = objectMapper.readTree(response).get("id").asInt();

        mockMvc.perform(put("/api/v1/articles/" + articleId + "/send-review")
                        .param("authorId", authorId.toString()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("IN_REVIEW"));
    }

    @Test
    void shouldDeleteArticle() throws Exception {
        ArticleRequestDTO dto = new ArticleRequestDTO();
        dto.setTitle("Mi artículo");
        dto.setContent("Contenido");
        dto.setAuthorId(authorId);

        String response = mockMvc.perform(post("/api/v1/articles")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto)))
                .andReturn()
                .getResponse()
                .getContentAsString();

        Integer articleId = objectMapper.readTree(response).get("id").asInt();

        mockMvc.perform(delete("/api/v1/articles/" + articleId)
                        .param("authorId", authorId.toString()))
                .andExpect(status().isNoContent());
    }

    @Test
    void shouldUploadImage() throws Exception {
        Mockito.when(imageService.saveImage(any())).thenReturn("http://image.com/img.png");

        ArticleRequestDTO dto = new ArticleRequestDTO();
        dto.setTitle("Mi artículo");
        dto.setContent("Contenido");
        dto.setAuthorId(authorId);

        String response = mockMvc.perform(post("/api/v1/articles")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto)))
                .andReturn()
                .getResponse()
                .getContentAsString();

        Integer articleId = objectMapper.readTree(response).get("id").asInt();

        MockMultipartFile file = new MockMultipartFile(
                "file",
                "image.png",
                MediaType.IMAGE_PNG_VALUE,
                "fake-image".getBytes()
        );

        mockMvc.perform(multipart("/api/v1/articles/" + articleId + "/upload-image")
                        .file(file))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.image").value("http://image.com/img.png"));
    }
}
