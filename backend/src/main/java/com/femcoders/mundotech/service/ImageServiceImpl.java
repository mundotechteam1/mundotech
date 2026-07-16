package com.femcoders.mundotech.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
public class ImageServiceImpl implements ImageService {

    private final String uploadDir = "uploads/images/";

    @Override
    public String saveImage(MultipartFile file) {
        try {

            String filename =
                    UUID.randomUUID()
                            + "_"
                            + file.getOriginalFilename();


            Path path = Paths.get(uploadDir + filename);


            Files.createDirectories(path.getParent());


            Files.copy(
                    file.getInputStream(),
                    path,
                    StandardCopyOption.REPLACE_EXISTING
            );


            return "/images/" + filename;


        } catch(Exception e){

            throw new RuntimeException(
                    "Error guardando imagen"
            );
        }    }
}
