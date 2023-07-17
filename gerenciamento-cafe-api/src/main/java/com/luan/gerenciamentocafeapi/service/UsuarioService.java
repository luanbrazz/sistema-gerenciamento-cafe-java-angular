package com.luan.gerenciamentocafeapi.service;

import org.springframework.http.ResponseEntity;

import java.util.Map;

public interface UsuarioService {
    ResponseEntity<String> signUp(Map<String, String> requestMap);
}
