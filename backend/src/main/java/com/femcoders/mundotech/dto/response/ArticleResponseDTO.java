package com.femcoders.mundotech.dto.response;

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
    private AuthorSummaryDTO author;
}
