package com.luan.gerenciamentocafeapi.restImpl;

import com.luan.gerenciamentocafeapi.POJO.Compra;
import com.luan.gerenciamentocafeapi.constents.CafeConstants;
import com.luan.gerenciamentocafeapi.rest.CompraRest;
import com.luan.gerenciamentocafeapi.service.CompraService;
import com.luan.gerenciamentocafeapi.utils.CafeUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
public class CompraRestImpl implements CompraRest {

    @Autowired
    CompraService compraService;

    @Override
    public ResponseEntity<String> gerarRelatorio(Map<String, Object> requestMap) {
        try {
            return compraService.gerarRelatorio(requestMap);
        } catch (Exception exception) {
            exception.printStackTrace();
        }
        return CafeUtils.getResponseEntity(CafeConstants.ALGO_DEU_ERRADO, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<List<Compra>> getCompra() {
        try {
            return compraService.getCompra();
        } catch (Exception exception) {
            exception.printStackTrace();
        }
        return null;
    }

    @Override
    public ResponseEntity<byte[]> getPdf(Map<String, Object> requestMap) {
        try {
            return compraService.getPdf(requestMap);
        } catch (Exception exception) {
            exception.printStackTrace();
        }
        return null;
    }

    @Override
    public ResponseEntity<String> deleteCompra(Integer id) {
        try {
            return compraService.deleteCompra(id);
        } catch (Exception exception) {
            exception.printStackTrace();
        }
        return CafeUtils.getResponseEntity(CafeConstants.ALGO_DEU_ERRADO, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}