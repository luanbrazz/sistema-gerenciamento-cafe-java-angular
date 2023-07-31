package com.luan.gerenciamentocafeapi.rest;

import com.luan.gerenciamentocafeapi.DTO.ProdutoDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;
import java.util.Map;

@RequestMapping(path = "/produto")
public interface ProdutoRest {

    @PostMapping(path = "/add")
    ResponseEntity<String> addNewProdruto(@RequestBody Map<String, String> requestMap);

    @GetMapping(path = "/get")
    ResponseEntity<List<ProdutoDTO>> getAllProduto();
}
