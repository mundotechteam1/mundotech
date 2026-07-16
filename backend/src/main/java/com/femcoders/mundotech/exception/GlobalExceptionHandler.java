package com.femcoders.mundotech.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<Map<String, String>> handleRuntimeException(RuntimeException ex) {
        String msg = ex.getMessage();
        HttpStatus status;

        if (msg == null) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        } else if (msg.contains("not found") || msg.contains("no encontrado")) {
            status = HttpStatus.NOT_FOUND;
        } else if (msg.contains("Only the author") || msg.contains("Only a manager")) {
            status = HttpStatus.FORBIDDEN;
        } else if (msg.contains("Only DRAFT") || msg.contains("Only articles in review")) {
            status = HttpStatus.BAD_REQUEST;
        } else {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        return ResponseEntity.status(status).body(Map.of("message", msg != null ? msg : "Internal error"));
    }
}
