package com.luan.gerenciamentocafeapi.rest;

import com.luan.gerenciamentocafeapi.POJO.Compra;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RequestMapping("/compra")
public interface CompraRest {

    @PostMapping(path = "/gerarRelatorio")
    ResponseEntity<String> gerarRelatorio(@RequestBody Map<String, Object> requestMap);

    @GetMapping(path = "/getCompra")
    ResponseEntity<List<Compra>> getCompra();

    @PostMapping(path = "/getPdf")
    ResponseEntity<byte[]> getPdf(@RequestBody Map<String, Object> requestMap);

    @PostMapping(path = "/delete/{id}")
    ResponseEntity<String> deleteCompra(@PathVariable Integer id);
}