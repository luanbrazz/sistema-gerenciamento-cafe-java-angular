package com.luan.gerenciamentocafeapi.serviceImpl;

import com.luan.gerenciamentocafeapi.DTO.UsuarioDTO;
import com.luan.gerenciamentocafeapi.JWT.CustomerUsersDetailsService;
import com.luan.gerenciamentocafeapi.JWT.JwtFilter;
import com.luan.gerenciamentocafeapi.JWT.JwtUtil;
import com.luan.gerenciamentocafeapi.POJO.Usuario;
import com.luan.gerenciamentocafeapi.constents.CafeConstants;
import com.luan.gerenciamentocafeapi.dao.UsuarioDao;
import com.luan.gerenciamentocafeapi.service.UsuarioService;
import com.luan.gerenciamentocafeapi.utils.CafeUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;

// Anotação do Lombok para gerar automaticamente um logger chamado 'log'
@Slf4j
// Anotação para indicar que esta classe é um serviço
@Service
// Classe que implementa a interface UsuarioService para fornecer os serviços relacionados a usuários.
public class UsuarioServiceImpl implements UsuarioService {

    // Atributo do tipo UsuarioDao que é injetado pelo Spring
    @Autowired
    UsuarioDao usuarioDao;

    // Atributo do tipo AuthenticationManager que é injetado pelo Spring para autenticação de usuários.
    @Autowired
    AuthenticationManager authenticationManager;

    // Atributo do tipo CustomerUsersDetailsService que é injetado pelo Spring para carregar detalhes do usuário durante a autenticação.
    @Autowired
    CustomerUsersDetailsService customerUsersDetailsService;

    // Atributo do tipo JwtUtil que é injetado pelo Spring para trabalhar com tokens JWT.
    @Autowired
    JwtUtil jwtUtil;

    @Autowired
    JwtFilter jwtFilter;

    @Override
    public ResponseEntity<String> signUp(Map<String, String> requestMap) {
        // Loga o mapa de cadastro
        log.info("Dentro do cadastro {}", requestMap);

        try {
            // Valida se o mapa de cadastro é válido
            if (validateSignUpMap(requestMap)) {
                // Verifica se já existe um usuário com o mesmo email
                Usuario usuario = usuarioDao.findByEmailId(requestMap.get("email"));
                if (Objects.isNull(usuario)) {
                    // Salva o novo usuário no banco de dados
                    usuarioDao.save(getUsuarioFromMap(requestMap));
                    // Retorna uma resposta HTTP com o status OK e a mensagem "Registro efetuado com sucesso"
                    return CafeUtils.getResponseEntity(CafeConstants.SUCESSO_REGISTRO, HttpStatus.OK);
                } else {
                    // Retorna uma resposta HTTP com o status BAD REQUEST e a mensagem "Email inválido"
                    return CafeUtils.getResponseEntity(CafeConstants.EMAIL_INVALIDO, HttpStatus.BAD_REQUEST);
                }
            } else {
                // Retorna uma resposta HTTP com o status BAD REQUEST e a mensagem "Dados inválidos"
                return CafeUtils.getResponseEntity(CafeConstants.DADOS_INVALIDOS, HttpStatus.BAD_REQUEST);
            }
        } catch (Exception exception) {
            // Imprime a pilha de chamadas da exceção no console
            exception.printStackTrace();
            // Retorna uma resposta HTTP com o status INTERNAL SERVER ERROR e a mensagem "Algo deu errado"
            return CafeUtils.getResponseEntity(CafeConstants.ALGO_DEU_ERRADO, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Valida se o mapa de cadastro possui todos os campos necessários
    private boolean validateSignUpMap(Map<String, String> requestMap) {
        if (requestMap.containsKey("nome") && requestMap.containsKey("numeroContato")
                && requestMap.containsKey("email") && requestMap.containsKey("senha")) {
            return true;
        } else {
            return false;
        }
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

    // Implementação do método login da interface UsuarioService
    @Override
    public ResponseEntity<String> login(Map<String, String> requestMap) {
        log.info("Entrou em Login");
        try {
            // Realiza a autenticação do usuário com as credenciais fornecidas no mapa de login.
            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(requestMap.get("email"), requestMap.get("senha"))
            );
            // Verifica se a autenticação foi bem-sucedida.
            if (auth.isAuthenticated()) {
                // Verifica se o usuário está ativo no sistema.
                if (customerUsersDetailsService.getUsuarioDetail().getStatus().equalsIgnoreCase("true")) {
                    // Gera um token JWT e retorna uma resposta HTTP com o token no corpo da resposta.
                    return new ResponseEntity<String>("{\"token\":\"" +
                            jwtUtil.generateToken(customerUsersDetailsService.getUsuarioDetail().getEmail(),
                                    customerUsersDetailsService.getUsuarioDetail().getRole()) + "\"}",
                            HttpStatus.OK);
                } else {
                    // Retorna uma resposta HTTP com o status BAD REQUEST e a mensagem "Contate o administrador" caso o usuário não esteja ativo.
                    return new ResponseEntity<String>("{\"mensagem\":\"" + CafeConstants.CONTATE_O_ADM + "\"}",
                            HttpStatus.BAD_REQUEST);
                }
            }
        } catch (Exception exception) {
            log.error("{}", exception);
        }
        // Retorna uma resposta HTTP com o status BAD REQUEST e a mensagem "Credencial inválida" caso a autenticação falhe.
        return new ResponseEntity<String>("{\"mensagem\":\"" + CafeConstants.CREDENCIAL_INVALIDA + "\"}",
                HttpStatus.BAD_REQUEST);
    }

    @Override
    public ResponseEntity<List<UsuarioDTO>> getAllUsuario() {
        try {
            if (jwtFilter.isAdmin()) {
                return new ResponseEntity<>(usuarioDao.getAllUsuario(), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(new ArrayList<>(), HttpStatus.UNAUTHORIZED);
            }
        } catch (Exception exception) {
            exception.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
