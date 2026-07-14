package com.femcoders.mundotech.security;

import com.femcoders.mundotech.security.filter.JWTAuthentication;
import com.femcoders.mundotech.security.filter.JWTAuthorization;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SpringConfig {

    private final CustomAuthenticationManager customAuthenticationManager;

    @Value("${JWT_SECRET}")
    private String secret;

    public SpringConfig(CustomAuthenticationManager customAuthenticationManager) {
        this.customAuthenticationManager = customAuthenticationManager;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        JWTAuthentication jwtAuthentication = new JWTAuthentication(customAuthenticationManager, secret);
        jwtAuthentication.setFilterProcessesUrl("/login");

        http
                .csrf(csrf -> csrf.disable())
                .headers(headers -> headers.frameOptions(frameOptions -> frameOptions.sameOrigin()))
                .authorizeHttpRequests(request -> request
                        // H2 console
                        .requestMatchers("/h2/**").permitAll()

                        // Login debe ser público
                        .requestMatchers("/login").permitAll()

                        // Crear usuario debe ser público
                        .requestMatchers(HttpMethod.POST, "/api/v1/users/**").permitAll()

                        // Reglas de artículos
                        .requestMatchers(HttpMethod.POST, "/api/v1/articles").hasRole("AUTHOR")
                        .requestMatchers(HttpMethod.GET, "/api/v1/articles/author/**").hasAnyRole("AUTHOR", "MANAGER")
                        .requestMatchers(HttpMethod.GET, "/api/v1/articles/status/published").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/v1/articles/status/in-review").hasRole("MANAGER")
                        .requestMatchers(HttpMethod.GET, "/api/v1/articles/status/draft").hasRole("AUTHOR")
                        .requestMatchers(HttpMethod.PUT, "/api/v1/articles/**").hasRole("AUTHOR")
                        .requestMatchers(HttpMethod.DELETE, "/api/v1/articles/**").hasRole("AUTHOR")
                        .requestMatchers(HttpMethod.PUT, "/api/v1/articles/*/send-review").hasRole("AUTHOR")
                        .requestMatchers(HttpMethod.PUT, "/api/v1/articles/*/approve").hasRole("MANAGER")

                        // Todo lo demás requiere autenticación
                        .anyRequest().authenticated()
                )
                .authenticationManager(customAuthenticationManager)

                .addFilter(jwtAuthentication)
                .addFilterAfter(new JWTAuthorization(secret), JWTAuthentication.class)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
        return http.build();
    }
}
