package com.luan.gerenciamentocafeapi.service;

import com.luan.gerenciamentocafeapi.DTO.ProdutoDTO;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

public interface ProdutoService {
    ResponseEntity<String> addNewProdruto(Map<String, String> requestMap);

    ResponseEntity<List<ProdutoDTO>> getAllProduto();

    ResponseEntity<String> updateProdruto(Map<String, String> requestMap);

    ResponseEntity<String> deleteProduto(Integer id);
}
