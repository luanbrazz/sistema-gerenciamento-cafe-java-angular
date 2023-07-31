package com.luan.gerenciamentocafeapi.restImpl;

import com.luan.gerenciamentocafeapi.DTO.ProdutoDTO;
import com.luan.gerenciamentocafeapi.constents.CafeConstants;
import com.luan.gerenciamentocafeapi.rest.ProdutoRest;
import com.luan.gerenciamentocafeapi.service.ProdutoService;
import com.luan.gerenciamentocafeapi.utils.CafeUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
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

    @Override
    public ResponseEntity<List<ProdutoDTO>> getAllProduto() {
        try {
            return produtoService.getAllProduto();
        } catch (Exception exception) {
            exception.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> updateProdruto(Map<String, String> requestMap) {
        try {
            return produtoService.updateProdruto(requestMap);
        } catch (Exception exception) {
            exception.printStackTrace();
        }
        return CafeUtils.getResponseEntity(CafeConstants.ALGO_DEU_ERRADO, HttpStatus.INTERNAL_SERVER_ERROR);

    }

    @Override
    public ResponseEntity<String> deleteProduto(Integer id) {
        try {
            return produtoService.deleteProduto(id);
        } catch (Exception exception) {
            exception.printStackTrace();
        }
        return CafeUtils.getResponseEntity(CafeConstants.ALGO_DEU_ERRADO, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
