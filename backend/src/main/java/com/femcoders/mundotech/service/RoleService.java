package com.femcoders.mundotech.service;

import com.femcoders.mundotech.dto.request.RoleRequestDTO;
import com.femcoders.mundotech.dto.response.RoleResponseDTO;
import com.femcoders.mundotech.entity.Role;

public interface RoleService {
    RoleResponseDTO createRole(RoleRequestDTO dto);
    Role getRoleEntityById(Integer id);
}