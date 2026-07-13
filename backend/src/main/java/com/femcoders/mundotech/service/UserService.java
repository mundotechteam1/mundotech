package com.femcoders.mundotech.service;

import com.femcoders.mundotech.entity.User;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;

public interface UserService {
    List<User> getAllUsers();
    User getUserById(Integer id);
    User createUser(User user);
    void deleteUser(Integer id);
    public UserDetails loadUserByEmail(String email);
}