package com.femcoders.mundotech.mapper;

import com.femcoders.mundotech.dto.response.AuthorSummaryDTO;
import com.femcoders.mundotech.entity.User;
import org.springframework.stereotype.Component;

@Component
public class AuthorMapper {
    public AuthorSummaryDTO toSummary(User author) {
        return new AuthorSummaryDTO(author.getId(), author.getName());
    }
}
