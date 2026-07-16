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
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;


@Configuration
public class SpringConfig {

    private final CustomAuthenticationManager customAuthenticationManager;

    @Value("${JWT_SECRET}")
    private String secret;

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:5173", "http://localhost:5174"));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "PATCH"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setExposedHeaders(List.of("Authorization"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    public SpringConfig(CustomAuthenticationManager customAuthenticationManager) {
        this.customAuthenticationManager = customAuthenticationManager;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        JWTAuthentication jwtAuthentication = new JWTAuthentication(customAuthenticationManager, secret);
        jwtAuthentication.setFilterProcessesUrl("/login");

        http
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .csrf(csrf -> csrf.disable())
                .headers(headers -> headers.frameOptions(frameOptions -> frameOptions.sameOrigin()))
                .authorizeHttpRequests(request -> request
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                        .requestMatchers("/h2/**").permitAll()
                        .requestMatchers("/login").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/v1/articles").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/v1/users/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/v1/articles").hasAnyRole("AUTHOR", "USER")
                        .requestMatchers(HttpMethod.GET, "/api/v1/articles/author/**").hasAnyRole("AUTHOR", "MANAGER")
                        .requestMatchers(HttpMethod.GET, "/api/v1/articles/status/published").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/v1/articles/status/in-review").hasRole("MANAGER")
                        .requestMatchers(HttpMethod.GET, "/api/v1/articles/status/draft").hasRole("AUTHOR")
                        .requestMatchers(HttpMethod.PUT, "/api/v1/articles/**").hasRole("AUTHOR")
                        .requestMatchers(HttpMethod.DELETE, "/api/v1/articles/**").hasRole("AUTHOR")
                        .requestMatchers(HttpMethod.PUT, "/api/v1/articles/*/send-review").hasAnyRole("AUTHOR", "USER")
                        .requestMatchers(HttpMethod.PUT, "/api/v1/articles/*/approve").hasRole("MANAGER")
                        .anyRequest().authenticated()
                )
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                .addFilterBefore(jwtAuthentication, UsernamePasswordAuthenticationFilter.class)

                .addFilterAfter(new JWTAuthorization(secret), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
