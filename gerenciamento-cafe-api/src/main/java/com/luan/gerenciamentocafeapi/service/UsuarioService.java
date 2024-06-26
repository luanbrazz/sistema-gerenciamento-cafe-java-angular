package com.luan.gerenciamentocafeapi.service;

import com.luan.gerenciamentocafeapi.DTO.UsuarioDTO;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

public interface UsuarioService {
    ResponseEntity<String> signUp(Map<String, String> requestMap);

    ResponseEntity<String> login(Map<String, String> requestMap);

    ResponseEntity<List<UsuarioDTO>> getAllUsuario();

    ResponseEntity<String> update(Map<String, String> requestMap);

    ResponseEntity<String> checkToken();

    ResponseEntity<String> changePassword(Map<String, String> requestMap);

    ResponseEntity<String> forgotPassword(Map<String, String> requestMap);
}
