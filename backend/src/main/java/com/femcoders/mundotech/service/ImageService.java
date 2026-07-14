package com.femcoders.mundotech.service;

import org.springframework.web.multipart.MultipartFile;

public interface ImageService {
    String saveImage(MultipartFile file);
}
