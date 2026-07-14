package com.femcoders.mundotech.config;

import com.femcoders.mundotech.entity.Role;
import com.femcoders.mundotech.entity.User;
import com.femcoders.mundotech.repository.RoleRepository;
import com.femcoders.mundotech.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Set;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final RoleRepository roleRepository;
    private final UserRepository userRepository;

    @Override
    public void run(String... args) {
        Role authorRole = roleRepository.findByName("AUTHOR")
                .orElseGet(() -> {
                    Role r = new Role();
                    r.setName("AUTHOR");
                    return roleRepository.save(r);
                });

        Role managerRole = roleRepository.findByName("MANAGER")
                .orElseGet(() -> {
                    Role r = new Role();
                    r.setName("MANAGER");
                    return roleRepository.save(r);
                });

        if (userRepository.findByEmail("ana@mundotech.pub").isEmpty()) {
            User author = new User();
            author.setName("Ana García");
            author.setEmail("ana@mundotech.pub");
            author.setPassword("123456");
            author.setRoles(Set.of(authorRole));
            userRepository.save(author);
        }

        if (userRepository.findByEmail("carlos@mundotech.pub").isEmpty()) {
            User manager = new User();
            manager.setName("Carlos López");
            manager.setEmail("carlos@mundotech.pub");
            manager.setPassword("123456");
            manager.setRoles(Set.of(managerRole));
            userRepository.save(manager);
        }
    }
}
