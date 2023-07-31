package com.luan.gerenciamentocafeapi.service;

import org.springframework.http.ResponseEntity;

import java.util.Map;

public interface ProdutoService {
    ResponseEntity<String> addNewProdruto(Map<String, String> requestMap);
}
