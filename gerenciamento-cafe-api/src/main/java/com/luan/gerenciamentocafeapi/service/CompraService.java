package com.luan.gerenciamentocafeapi.service;

import com.luan.gerenciamentocafeapi.POJO.Compra;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

public interface CompraService {
    ResponseEntity<String> gerarRelatorio(Map<String, Object> requestMap);

    ResponseEntity<List<Compra>> getCompra();


    ResponseEntity<byte[]> getPdf(Map<String, Object> requestMap);

    ResponseEntity<String> deleteCompra(Integer id);
}
