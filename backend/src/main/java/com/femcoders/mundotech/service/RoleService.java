package com.femcoders.mundotech.service;

import com.femcoders.mundotech.entity.Role;

public interface RoleService {

    public Role createRole(Role role);
    public Role getRoleById(Integer id);
}