package com.luan.gerenciamentocafeapi.restImpl;

import com.luan.gerenciamentocafeapi.constents.CafeConstants;
import com.luan.gerenciamentocafeapi.rest.CategoriaRest;
import com.luan.gerenciamentocafeapi.service.CategoriaService;
import com.luan.gerenciamentocafeapi.utils.CafeUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class CategoriaRestImpl implements CategoriaRest {

    @Autowired
    CategoriaService categoriaService;

    @Override
    public ResponseEntity<String> addNewCategoria(Map<String, String> requestMap) {
        try {
            return categoriaService.addNewCategoria(requestMap);

        } catch (Exception exception) {
            exception.printStackTrace();
        }
        return CafeUtils.getResponseEntity(CafeConstants.ALGO_DEU_ERRADO, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
