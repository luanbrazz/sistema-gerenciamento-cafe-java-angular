package com.luan.gerenciamentocafeapi.rest;

import com.luan.gerenciamentocafeapi.POJO.Compra;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;
import java.util.Map;

@RequestMapping("/compra")
public interface CompraRest {

    @PostMapping(path = "/gerarRelatorio")
    ResponseEntity<String> gerarRelatorio(@RequestBody Map<String, Object> requestMap);

    @GetMapping(path = "/getCompra")
    ResponseEntity<List<Compra>> getCompra();
}