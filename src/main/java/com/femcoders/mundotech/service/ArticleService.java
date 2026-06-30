package com.femcoders.mundotech.service;
import org.springframework.stereotype.Service;  
import org.springframework.beans.factory.annotation.Autowired;
import com.femcoders.mundotech.repository.ArticleRepository;
import com.femcoders.mundotech.entity.Article;
import com.femcoders.mundotech.entity.ArticleStatus;
import com.femcoders.mundotech.entity.UserRepository;
import java.util.List;

@Service
public class ArticleService {
    private final ArticleRepository articleRepository;
    private final UserRepository userRepository;

    public ArticleService(ArticleRepository articleRepository, UserRepository userRepository) {
        this.articleRepository = articleRepository;
        this.userRepository = userRepository;
    }

}
