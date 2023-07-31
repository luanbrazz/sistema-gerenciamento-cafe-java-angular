package com.luan.gerenciamentocafeapi.rest;

import com.luan.gerenciamentocafeapi.POJO.Categoria;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;
import java.util.Map;

@RequestMapping(path = "/categoria")
public interface CategoriaRest {

    @PostMapping(path = "/add")
    ResponseEntity<String> addNewCategoria(@RequestBody(required = true) Map<String, String> requestMap);

    @GetMapping(path = "/get")
    ResponseEntity<List<Categoria>> getAllCategoria(@RequestBody(required = false) String filterValue);

    @PostMapping(path = "/update")
    ResponseEntity<String> updateCategoria(@RequestBody(required = true) Map<String, String> requestMap);
}
