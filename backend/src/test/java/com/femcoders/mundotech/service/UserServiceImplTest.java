package com.femcoders.mundotech.service;

import com.femcoders.mundotech.dto.request.UserRequestDTO;
import com.femcoders.mundotech.dto.response.UserResponseDTO;
import com.femcoders.mundotech.entity.Role;
import com.femcoders.mundotech.entity.User;
import com.femcoders.mundotech.mapper.UserMapper;
import com.femcoders.mundotech.repository.RoleRepository;
import com.femcoders.mundotech.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceImplTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private RoleService roleService;

    @Mock
    private UserMapper userMapper;

    @Mock
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @InjectMocks
    private UserServiceImpl userService;

    @Test
    void shouldCreateUserWhenEmailDoesNotExist() {

        UserRequestDTO dto = new UserRequestDTO();
        dto.setEmail("nuevo@test.com");
        dto.setName("Nuevo");
        dto.setPassword("123456");

        // 1. mapper.toEntity(dto)
        User entity = new User();
        entity.setEmail("nuevo@test.com");
        entity.setName("Nuevo");
        entity.setPassword("123456");

        when(userMapper.toEntity(dto)).thenReturn(entity);

        // 2. encode password
        when(bCryptPasswordEncoder.encode(any(CharSequence.class)))
                .thenReturn("encoded-password");

        // 3. roleService.getRoleEntityById
        Role role = new Role();
        role.setId(1);
        when(roleService.getRoleEntityById(1)).thenReturn(role);

        // 4. repository.save
        User saved = new User();
        saved.setId(1);
        saved.setEmail("nuevo@test.com");
        saved.setName("Nuevo");
        saved.setPassword("encoded-password");
        saved.setRoles(Set.of(role));

        when(userRepository.save(entity)).thenReturn(saved);

        // 5. mapper.toResponse
        UserResponseDTO response = new UserResponseDTO();
        response.setId(1);
        response.setEmail("nuevo@test.com");
        response.setName("Nuevo");

        when(userMapper.toResponse(saved)).thenReturn(response);

        // EXECUTE
        UserResponseDTO result = userService.createUser(dto, 1);

        // ASSERT
        assertEquals("nuevo@test.com", result.getEmail());
        assertEquals("Nuevo", result.getName());
        assertEquals(1, result.getId());
    }

    @Test
    void shouldReturnUserById() {

        User entity = new User();
        entity.setId(1);
        entity.setEmail("test@test.com");
        entity.setName("Test");

        when(userRepository.findById(1)).thenReturn(Optional.of(entity));

        UserResponseDTO response = new UserResponseDTO();
        response.setId(1);
        response.setEmail("test@test.com");
        response.setName("Test");

        when(userMapper.toResponse(entity)).thenReturn(response);

        UserResponseDTO result = userService.getUserById(1);

        assertEquals(1, result.getId());
        assertEquals("test@test.com", result.getEmail());
        assertEquals("Test", result.getName());
    }

    @Test
    void shouldReturnAllUsers() {
        User u1 = new User();
        u1.setId(1);
        User u2 = new User();
        u2.setId(2);

        when(userRepository.findAll()).thenReturn(List.of(u1, u2));

        UserResponseDTO r1 = new UserResponseDTO();
        r1.setId(1);
        UserResponseDTO r2 = new UserResponseDTO();
        r2.setId(2);

        when(userMapper.toResponse(u1)).thenReturn(r1);
        when(userMapper.toResponse(u2)).thenReturn(r2);

        List<UserResponseDTO> result = userService.getAllUsers();

        assertEquals(2, result.size());
        assertEquals(1, result.get(0).getId());
        assertEquals(2, result.get(1).getId());
    }

    @Test
    void shouldDeleteUser() {
        userService.deleteUser(1);
        verify(userRepository).deleteById(1);
    }

    @Test
    void shouldLoadUserByEmail() {
        User entity = new User();
        entity.setEmail("test@test.com");

        when(userRepository.findByEmail("test@test.com"))
                .thenReturn(Optional.of(entity));

        UserDetails result = userService.loadUserByEmail("test@test.com");

        assertNotNull(result);
        assertEquals("test@test.com", result.getUsername());
    }

}
