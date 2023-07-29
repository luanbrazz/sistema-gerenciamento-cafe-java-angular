package com.luan.gerenciamentocafeapi.rest;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Map;

@RequestMapping(path = "/categoria")
public interface CategoriaRest {

    @PostMapping(path = "/add")
    ResponseEntity<String> addNewCategoria(@RequestBody(required = true) Map<String, String> requestMap);
}
