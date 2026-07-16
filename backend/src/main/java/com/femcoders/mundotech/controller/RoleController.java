package com.femcoders.mundotech.controller;

import com.femcoders.mundotech.dto.request.RoleRequestDTO;
import com.femcoders.mundotech.dto.response.RoleResponseDTO;
import com.femcoders.mundotech.service.RoleService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/roles")
@RequiredArgsConstructor
public class RoleController {

    private final RoleService roleService;

    @PostMapping
    public ResponseEntity<RoleResponseDTO> createRole(
            @Valid @RequestBody RoleRequestDTO dto) {

        RoleResponseDTO response = roleService.createRole(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}