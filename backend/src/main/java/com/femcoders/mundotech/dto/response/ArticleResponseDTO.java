package com.femcoders.mundotech.dto.response;

import com.femcoders.mundotech.entity.enums.ArticleStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ArticleResponseDTO {
    private Integer id;
    private String title;
    private String content;
    private String image;
    private AuthorSummaryDTO author;
    private ArticleStatus status;
}
