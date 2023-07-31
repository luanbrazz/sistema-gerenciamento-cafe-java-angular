package com.luan.gerenciamentocafeapi.rest;

import com.luan.gerenciamentocafeapi.DTO.ProdutoDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RequestMapping(path = "/produto")
public interface ProdutoRest {

    @PostMapping(path = "/add")
    ResponseEntity<String> addNewProdruto(@RequestBody Map<String, String> requestMap);

    @GetMapping(path = "/get")
    ResponseEntity<List<ProdutoDTO>> getAllProduto();

    @PostMapping(path = "/update")
    ResponseEntity<String> updateProdruto(@RequestBody Map<String, String> requestMap);

    @PostMapping(path = "/delete/{id}")
    ResponseEntity<String> deleteProduto(@PathVariable Integer id);
}
