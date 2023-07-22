package com.luan.gerenciamentocafeapi.restImpl;

import com.luan.gerenciamentocafeapi.constents.CafeConstants;
import com.luan.gerenciamentocafeapi.rest.UsuarioRest;
import com.luan.gerenciamentocafeapi.service.UsuarioService;
import com.luan.gerenciamentocafeapi.utils.CafeUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class UsuarioRestImpl implements UsuarioRest {

    @Autowired
    UsuarioService usuarioService;

    // Implementação do método signUp da interface UsuarioRest
    @Override
    public ResponseEntity<String> signUp(Map<String, String> requestMap) {
        try {
            // Chama o método signUp do usuarioService para processar a requisição
            return usuarioService.signUp(requestMap);
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        // Se ocorrer uma exceção, retorna uma resposta padronizada de erro
        return CafeUtils.getResponseEntity(CafeConstants.ALGO_DEU_ERRADO, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> login(Map<String, String> requestMap) {
        try {
            return usuarioService.login(requestMap);
        } catch (Exception exception) {
            exception.printStackTrace();
        }
        // Se ocorrer uma exceção, retorna uma resposta padronizada de erro
        return CafeUtils.getResponseEntity(CafeConstants.ALGO_DEU_ERRADO, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}