package com.femcoders.mundotech.service;

import com.femcoders.mundotech.dto.request.UserRequestDTO;
import com.femcoders.mundotech.dto.response.UserResponseDTO;
import com.femcoders.mundotech.entity.User;
import java.util.List;

public interface UserService {
    List<UserResponseDTO> getAllUsers();
    UserResponseDTO getUserById(Integer id);
    User getUserEntityById(Integer id);
    UserResponseDTO createUser(UserRequestDTO dto, Integer roleId);
    void deleteUser(Integer id);
}