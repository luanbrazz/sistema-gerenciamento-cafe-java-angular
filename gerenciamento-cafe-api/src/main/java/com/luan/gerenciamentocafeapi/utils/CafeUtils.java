package com.luan.gerenciamentocafeapi.utils;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class CafeUtils {
    private CafeUtils() {
    }

    // Método estático para retornar um ResponseEntity com uma mensagem de resposta e um HttpStatus específico
    public static ResponseEntity<String> getResponseEntity(String responseMessage, HttpStatus httpStatus) {
        return new ResponseEntity<String>("{\"mensagem\":\"" + responseMessage + "\"}", httpStatus);
    }
}
