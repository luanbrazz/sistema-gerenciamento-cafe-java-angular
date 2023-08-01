package com.luan.gerenciamentocafeapi.rest;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Map;

@RequestMapping("/compra")
public interface CompraRest {

    @PostMapping(path = "/gerarRelatorio")
    ResponseEntity<String> gerarRelatorio(@RequestBody Map<String, Object> requestMap);
}