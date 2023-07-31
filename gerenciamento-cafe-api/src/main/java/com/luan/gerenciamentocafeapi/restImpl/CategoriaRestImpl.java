package com.luan.gerenciamentocafeapi.restImpl;

import com.luan.gerenciamentocafeapi.POJO.Categoria;
import com.luan.gerenciamentocafeapi.constents.CafeConstants;
import com.luan.gerenciamentocafeapi.rest.CategoriaRest;
import com.luan.gerenciamentocafeapi.service.CategoriaService;
import com.luan.gerenciamentocafeapi.utils.CafeUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
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

    @Override
    public ResponseEntity<List<Categoria>> getAllCategoria(String filterValue) {
        try {
            return categoriaService.getAllCategoria(filterValue);
        } catch (Exception exception) {
            exception.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> updateCategoria(Map<String, String> requestMap) {
        try {
            return categoriaService.updateCategoria(requestMap);
        } catch (Exception exception) {
            exception.printStackTrace();
        }
        return CafeUtils.getResponseEntity(CafeConstants.ALGO_DEU_ERRADO, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
