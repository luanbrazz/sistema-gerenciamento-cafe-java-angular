package com.luan.gerenciamentocafeapi.restImpl;

import com.luan.gerenciamentocafeapi.DTO.UsuarioDTO;
import com.luan.gerenciamentocafeapi.constents.CafeConstants;
import com.luan.gerenciamentocafeapi.rest.UsuarioRest;
import com.luan.gerenciamentocafeapi.service.UsuarioService;
import com.luan.gerenciamentocafeapi.utils.CafeUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
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

    @Override
    public ResponseEntity<List<UsuarioDTO>> findAllUsuario() {
        try {
            // Chama o método getAllUsuario do usuarioService para obter a lista de usuários e retorna a resposta
            return usuarioService.getAllUsuario();
        } catch (Exception exception) {
            // Em caso de exceção, imprime o stack trace para fins de depuração
            exception.printStackTrace();
        }
        // Se ocorrer uma exceção, retorna uma resposta padronizada de erro com status 500 - INTERNAL_SERVER_ERROR
        return new ResponseEntity<List<UsuarioDTO>>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> update(Map<String, String> requestMap) {
        try {
            // Chama o método update do usuarioService para processar a requisição e retorna a resposta
            return usuarioService.update(requestMap);
        } catch (Exception exception) {
            // Em caso de exceção, imprime o stack trace para fins de depuração
            exception.printStackTrace();
        }
        // Se ocorrer uma exceção, retorna uma resposta padronizada de erro com status 500 - INTERNAL_SERVER_ERROR
        return CafeUtils.getResponseEntity(CafeConstants.ALGO_DEU_ERRADO, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> checkToken() {
        try {
            // Chama o método checkToken do usuarioService para verificar o token e retorna a resposta
            return usuarioService.checkToken();
        } catch (Exception exception) {
            // Em caso de exceção, imprime o stack trace para fins de depuração
            exception.printStackTrace();
        }
        // Se ocorrer uma exceção, retorna uma resposta padronizada de erro com status 500 - INTERNAL_SERVER_ERROR
        return CafeUtils.getResponseEntity(CafeConstants.ALGO_DEU_ERRADO, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> changePassword(Map<String, String> requestMap) {
        try {
            return usuarioService.changePassword(requestMap);
        } catch (Exception exception) {
            exception.printStackTrace();
        }
        return CafeUtils.getResponseEntity(CafeConstants.ALGO_DEU_ERRADO, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> forgotPassword(Map<String, String> requestMap) {
        try {
            return usuarioService.forgotPassword(requestMap);
        } catch (Exception exception) {
            exception.printStackTrace();
        }
        return CafeUtils.getResponseEntity(CafeConstants.ALGO_DEU_ERRADO, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}