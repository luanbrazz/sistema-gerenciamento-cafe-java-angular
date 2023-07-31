package com.luan.gerenciamentocafeapi.restImpl;

import com.luan.gerenciamentocafeapi.constents.CafeConstants;
import com.luan.gerenciamentocafeapi.rest.ProdutoRest;
import com.luan.gerenciamentocafeapi.service.ProdutoService;
import com.luan.gerenciamentocafeapi.utils.CafeUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class ProdutoRestImpl implements ProdutoRest {

    @Autowired
    ProdutoService produtoService;

    @Override
    public ResponseEntity<String> addNewProdruto(Map<String, String> requestMap) {
        try {
            return produtoService.addNewProdruto(requestMap);
        } catch (Exception exception) {
            exception.printStackTrace();
        }
        return CafeUtils.getResponseEntity(CafeConstants.ALGO_DEU_ERRADO, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
