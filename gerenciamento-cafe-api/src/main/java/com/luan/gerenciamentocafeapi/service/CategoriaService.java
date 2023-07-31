package com.luan.gerenciamentocafeapi.service;

import com.luan.gerenciamentocafeapi.POJO.Categoria;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

public interface CategoriaService {
    ResponseEntity<String> addNewCategoria(Map<String, String> requestMap);

    ResponseEntity<List<Categoria>> getAllCategoria(String filterValue);

    ResponseEntity<String> updateCategoria(Map<String, String> requestMap);
}
