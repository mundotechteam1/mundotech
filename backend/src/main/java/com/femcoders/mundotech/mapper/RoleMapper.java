package com.femcoders.mundotech.mapper;

import com.femcoders.mundotech.dto.request.RoleRequestDTO;
import com.femcoders.mundotech.dto.response.RoleResponseDTO;
import com.femcoders.mundotech.entity.Role;
import org.springframework.stereotype.Component;

@Component
public class RoleMapper {
    public Role toEntity(RoleRequestDTO dto) {
        Role role = new Role();
        role.setName(dto.getName());
        return role;
    }

    public RoleResponseDTO toResponse(Role role) {
        RoleResponseDTO dto = new RoleResponseDTO();
        dto.setId(role.getId());
        dto.setName(role.getName());
        return dto;
    }
}
