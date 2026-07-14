package com.femcoders.mundotech.service;

import com.femcoders.mundotech.dto.request.RoleRequestDTO;
import com.femcoders.mundotech.dto.response.RoleResponseDTO;
import com.femcoders.mundotech.entity.Role;
import com.femcoders.mundotech.mapper.RoleMapper;
import com.femcoders.mundotech.repository.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RoleServiceImpl implements RoleService {

    private final RoleRepository roleRepository;
    private final RoleMapper roleMapper;

    @Override
    public RoleResponseDTO createRole(RoleRequestDTO dto) {
        Role role = roleMapper.toEntity(dto);
        Role saved = roleRepository.save(role);
        return roleMapper.toResponse(saved);
    }

    @Override
    public Role getRoleEntityById(Integer id) {
        return roleRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Role not found with id: " + id));
    }
}