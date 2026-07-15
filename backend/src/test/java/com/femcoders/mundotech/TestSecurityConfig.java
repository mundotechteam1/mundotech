package com.femcoders.mundotech;

import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@TestConfiguration
public class TestSecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        // Disable everything
        http.csrf().disable()
                .authorizeHttpRequests(auth -> auth.anyRequest().permitAll())
                .sessionManagement(sm -> sm.disable())
                .securityContext(sc -> sc.disable());

        // Disable JWT filters
        http.addFilterBefore((request, response, chain) -> chain.doFilter(request, response),
                UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
