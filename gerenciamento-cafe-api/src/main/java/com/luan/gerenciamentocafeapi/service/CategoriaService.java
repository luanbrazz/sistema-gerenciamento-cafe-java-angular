package com.luan.gerenciamentocafeapi.service;

import org.springframework.http.ResponseEntity;

import java.util.Map;

public interface CategoriaService {
    ResponseEntity<String> addNewCategoria(Map<String, String> requestMap);
}
