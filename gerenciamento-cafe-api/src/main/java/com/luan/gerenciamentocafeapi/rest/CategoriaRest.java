package com.luan.gerenciamentocafeapi.rest;

import com.luan.gerenciamentocafeapi.POJO.Categoria;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RequestMapping(path = "/categoria")
public interface CategoriaRest {

    @PostMapping(path = "/add")
    ResponseEntity<String> addNewCategoria(@RequestBody(required = true) Map<String, String> requestMap);

    @GetMapping(path = "/get")
    ResponseEntity<List<Categoria>> getAllCategoria(@RequestParam(name = "filterValue", required = false) String filterValue);

    @PostMapping(path = "/update")
    ResponseEntity<String> updateCategoria(@RequestBody(required = true) Map<String, String> requestMap);
}
