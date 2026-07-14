package com.femcoders.mundotech.controller;

import com.femcoders.mundotech.dto.request.LoginRequestDTO;
import com.femcoders.mundotech.dto.response.LoginResponseDTO;
import com.femcoders.mundotech.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@Valid @RequestBody LoginRequestDTO dto) {
        LoginResponseDTO response = userService.login(dto);
        return ResponseEntity.ok(response);
    }
}
