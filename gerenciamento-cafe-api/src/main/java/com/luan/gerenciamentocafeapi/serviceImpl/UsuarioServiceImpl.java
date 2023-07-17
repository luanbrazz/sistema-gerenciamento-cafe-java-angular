package com.luan.gerenciamentocafeapi.serviceImpl;

import com.luan.gerenciamentocafeapi.POJO.Usuario;
import com.luan.gerenciamentocafeapi.constents.CafeConstants;
import com.luan.gerenciamentocafeapi.dao.UsuarioDao;
import com.luan.gerenciamentocafeapi.service.UsuarioService;
import com.luan.gerenciamentocafeapi.utils.CafeUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Objects;

@Slf4j // Anotação do Lombok para gerar automaticamente um logger chamado 'log'
@Service
public class UsuarioServiceImpl implements UsuarioService {

    @Autowired
    UsuarioDao usuarioDao; //repository

    // Implementação do método signUp da interface UsuarioService
    @Override
    public ResponseEntity<String> signUp(Map<String, String> requestMap) {
        log.info("Dentro do cadastro {}", requestMap);

        try {
            // Valida se o mapa de cadastro é válido
            if (validateSignUpMap(requestMap)) {
                // Verifica se já existe um usuário com o mesmo email
                Usuario usuario = usuarioDao.findByEmailId(requestMap.get("email"));
                if (Objects.isNull(usuario)) {
                    // Salva o novo usuário no banco de dados
                    usuarioDao.save(getUsuarioFromMap(requestMap));
                    return CafeUtils.getResponseEntity(CafeConstants.SUCESSO_REGISTRO, HttpStatus.OK);
                } else {
                    return CafeUtils.getResponseEntity(CafeConstants.EMAIL_INVALIDO, HttpStatus.BAD_REQUEST);
                }
            } else {
                return CafeUtils.getResponseEntity(CafeConstants.DADOS_INVALIDOS, HttpStatus.BAD_REQUEST);
            }
        } catch (Exception exception){
            exception.printStackTrace();
        }
        return CafeUtils.getResponseEntity(CafeConstants.ALGO_DEU_ERRADO, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    // Valida se o mapa de cadastro possui todos os campos necessários
    private boolean validateSignUpMap(Map<String, String> requestMap) {
        if (requestMap.containsKey("nome") && requestMap.containsKey("numeroContato")
                && requestMap.containsKey("email") && requestMap.containsKey("senha")) {
            return true;
        }
        return false;
    }

    // Cria um objeto Usuario a partir do mapa de cadastro
    private Usuario getUsuarioFromMap(Map<String, String> requestMap) {
        Usuario usuario = new Usuario();
        usuario.setNome(requestMap.get("nome"));
        usuario.setNumeroContato(requestMap.get("numeroContato"));
        usuario.setEmail(requestMap.get("email"));
        usuario.setSenha(requestMap.get("senha"));
        usuario.setStatus("false");
        usuario.setRole("usuario");

        return usuario;
    }
}
