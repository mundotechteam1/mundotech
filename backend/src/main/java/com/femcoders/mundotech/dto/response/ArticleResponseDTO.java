package com.femcoders.mundotech.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ArticleResponseDTO {
    private Integer id;
    private String title;
    private String content;
    private String image;
    private String status;
    private LocalDateTime createdAt;
    private AuthorSummaryDTO author;
}
