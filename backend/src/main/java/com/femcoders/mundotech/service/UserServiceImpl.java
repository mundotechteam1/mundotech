package com.femcoders.mundotech.service;

import com.femcoders.mundotech.dto.request.UserRequestDTO;
import com.femcoders.mundotech.dto.response.UserResponseDTO;
import com.femcoders.mundotech.entity.Role;
import com.femcoders.mundotech.entity.User;
import com.femcoders.mundotech.mapper.UserMapper;
import com.femcoders.mundotech.repository.UserRepository;
import com.femcoders.mundotech.security.UserDetail;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService, UserDetailsService {

    private final UserRepository userRepository;
    private final RoleService roleService;
    private final UserMapper userMapper;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    public List<UserResponseDTO> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(userMapper::toResponse)
                .toList();
    }

    @Override
    public UserResponseDTO getUserById(Integer id) {
        User user = userRepository.findById(id)
                .orElseThrow(() ->
                        new ResponseStatusException(HttpStatus.NOT_FOUND,
                                "User not found with id: " + id));

        return userMapper.toResponse(user);
    }

    @Override
    public User getUserEntityById(Integer id) {
        return userRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));
    }

    @Override
    public UserResponseDTO createUser(UserRequestDTO dto, Integer roleId) {

        User user = userMapper.toEntity(dto);

        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));

        Role role = roleService.getRoleEntityById(roleId);
        user.setRoles(Set.of(role));

        User saved = userRepository.save(user);

        return userMapper.toResponse(saved);
    }

    @Override
    public void deleteUser(Integer id) {
        userRepository.deleteById(id);
    }

    @Override
    public UserDetails loadUserByEmail(String email) throws UsernameNotFoundException {
        return userRepository.findByEmail(email)
                .map(UserDetail::new)
                .orElseThrow(() ->
                        new UsernameNotFoundException("Usuario no encontrado con email: " + email));
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return loadUserByEmail(email);
    }
}
