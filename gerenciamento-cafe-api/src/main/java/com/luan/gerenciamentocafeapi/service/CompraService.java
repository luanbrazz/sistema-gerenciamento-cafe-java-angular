package com.luan.gerenciamentocafeapi.service;

import org.springframework.http.ResponseEntity;

import java.util.Map;

public interface CompraService {
    ResponseEntity<String> gerarRelatorio(Map<String, Object> requestMap);
}
