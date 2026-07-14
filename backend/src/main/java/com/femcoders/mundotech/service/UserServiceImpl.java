package com.femcoders.mundotech.service;

import com.femcoders.mundotech.dto.request.LoginRequestDTO;
import com.femcoders.mundotech.dto.request.UserRequestDTO;
import com.femcoders.mundotech.dto.response.LoginResponseDTO;
import com.femcoders.mundotech.dto.response.UserResponseDTO;
import com.femcoders.mundotech.entity.Role;
import com.femcoders.mundotech.entity.User;
import com.femcoders.mundotech.mapper.UserMapper;
import com.femcoders.mundotech.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final RoleService roleService;
    private final UserMapper userMapper;

    @Override
    public List<UserResponseDTO> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(userMapper::toResponse)
                .toList();
    }

    @Override
    public UserResponseDTO getUserById(Integer id) {
        User user = userRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found with id: " + id));

        return userMapper.toResponse(user);
    }

    @Override
    public User getUserEntityById(Integer id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @Override
    public UserResponseDTO createUser(UserRequestDTO dto, Integer roleId) {
        User user = userMapper.toEntity(dto);
        Role role = roleService.getRoleEntityById(roleId);        user.setRoles(Set.of(role));

        User saved = userRepository.save(user);

        return userMapper.toResponse(saved);
    }

    @Override
    public void deleteUser(Integer id) {
        userRepository.deleteById(id);
    }

    @Override
    public LoginResponseDTO login(LoginRequestDTO dto) {
        User user = userRepository.findByEmail(dto.getEmail())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid email or password"));

        if (!user.getPassword().equals(dto.getPassword())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid email or password");
        }

        Set<String> roleNames = user.getRoles().stream()
                .map(Role::getName)
                .collect(Collectors.toSet());

        return new LoginResponseDTO(
                user.getId(),
                user.getName(),
                user.getEmail(),
                roleNames
        );
    }
}
