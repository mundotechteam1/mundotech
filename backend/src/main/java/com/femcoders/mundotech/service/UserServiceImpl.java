package com.femcoders.mundotech.service;

import com.femcoders.mundotech.entity.Role;
import com.femcoders.mundotech.entity.User;
import com.femcoders.mundotech.repository.RoleRepository;
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

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService, UserDetailsService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User getUserById(Integer id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "User not found with id: " + id));
    }

    @Override
    public User createUser(User user) {
        Set<Role> resolvedRoles = new HashSet<>();
        for (Role role : user.getRoles()) {
            Role existingRole = roleRepository.findById(role.getId())
                    .orElseThrow(() -> new ResponseStatusException(
                            HttpStatus.NOT_FOUND, "Role not found with id: " + role.getId()));
            resolvedRoles.add(existingRole);
        }
        user.setRoles(resolvedRoles);
        return userRepository.save(user);
    }

    @Override
    public void deleteUser(Integer id) {
        User user = getUserById(id);
        userRepository.delete(user);
    }

    @Override
    public UserDetails loadUserByEmail(String email) throws UsernameNotFoundException {
        return userRepository.findByEmail(email)
                .map(user -> new UserDetail(user))
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado con email: " + email));
    }


    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return loadUserByEmail(email);
    }
}