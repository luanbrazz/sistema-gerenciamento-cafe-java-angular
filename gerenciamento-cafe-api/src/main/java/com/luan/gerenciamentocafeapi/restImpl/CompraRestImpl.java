package com.luan.gerenciamentocafeapi.restImpl;

import com.luan.gerenciamentocafeapi.constents.CafeConstants;
import com.luan.gerenciamentocafeapi.rest.CompraRest;
import com.luan.gerenciamentocafeapi.service.CompraService;
import com.luan.gerenciamentocafeapi.utils.CafeUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

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
}
