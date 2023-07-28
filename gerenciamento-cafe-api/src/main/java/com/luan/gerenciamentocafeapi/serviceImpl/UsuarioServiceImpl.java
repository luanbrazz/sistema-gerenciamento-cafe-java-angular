package com.luan.gerenciamentocafeapi.serviceImpl;

import com.google.common.base.Strings;
import com.luan.gerenciamentocafeapi.DTO.UsuarioDTO;
import com.luan.gerenciamentocafeapi.JWT.CustomerUsersDetailsService;
import com.luan.gerenciamentocafeapi.JWT.JwtFilter;
import com.luan.gerenciamentocafeapi.JWT.JwtUtil;
import com.luan.gerenciamentocafeapi.POJO.Usuario;
import com.luan.gerenciamentocafeapi.constents.CafeConstants;
import com.luan.gerenciamentocafeapi.dao.UsuarioDao;
import com.luan.gerenciamentocafeapi.service.UsuarioService;
import com.luan.gerenciamentocafeapi.utils.CafeUtils;
import com.luan.gerenciamentocafeapi.utils.EmailUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.*;

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

    @Autowired
    EmailUtils emailUtils;

    // Implementação do método signUp da interface UsuarioService
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

    // Implementação do método getAllUsuario da interface UsuarioService
    @Override
    public ResponseEntity<List<UsuarioDTO>> getAllUsuario() {
        try {
            if (jwtFilter.isAdmin()) {
                // Obtém a lista de todos os usuários do banco de dados e retorna uma resposta HTTP com a lista e status 200 - OK.
                return new ResponseEntity<>(usuarioDao.getAllUsuario(), HttpStatus.OK);
            } else {
                // Retorna uma resposta HTTP com o status UNAUTHORIZED (401) caso o usuário não seja um administrador.
                return new ResponseEntity<>(new ArrayList<>(), HttpStatus.UNAUTHORIZED);
            }
        } catch (Exception exception) {
            exception.printStackTrace();
        }
        // Retorna uma resposta HTTP com o status INTERNAL_SERVER_ERROR (500) caso ocorra uma exceção.
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    // Implementação do método update da interface UsuarioService
    @Override
    public ResponseEntity<String> update(Map<String, String> requestMap) {
        try {
            if (jwtFilter.isAdmin()) {
                Optional<Usuario> optional = usuarioDao.findById(Integer.parseInt(requestMap.get("id")));

                if (!optional.isEmpty()) {
                    // Atualiza o status do usuário no banco de dados com base no mapa de requisição.
                    usuarioDao.updateStatus(requestMap.get("status"), Integer.parseInt(requestMap.get("id")));
                    // Envia e-mail para todos os administradores informando sobre a atualização de status.
                    sendMailToAllAdmin(requestMap.get("status"), optional.get().getEmail(), usuarioDao.getAllAdmin());
                    // Retorna uma resposta HTTP com o status OK e a mensagem "Status atualizado com sucesso".
                    return CafeUtils.getResponseEntity(CafeConstants.SUCESSO_UPDATE_STATUS, HttpStatus.OK);
                } else {
                    // Retorna uma resposta HTTP com o status OK e a mensagem "ID de usuário inexistente".
                    return CafeUtils.getResponseEntity(CafeConstants.ID_USUARIO_INEXISTENTE, HttpStatus.OK);
                }

            } else {
                // Retorna uma resposta HTTP com o status UNAUTHORIZED (401) caso o usuário não seja um administrador.
                return CafeUtils.getResponseEntity(CafeConstants.ACESSO_NEGADO, HttpStatus.UNAUTHORIZED);
            }
        } catch (Exception exception) {
            exception.printStackTrace();
        }
        // Retorna uma resposta HTTP com o status INTERNAL_SERVER_ERROR (500) caso ocorra uma exceção.
        return CafeUtils.getResponseEntity(CafeConstants.ALGO_DEU_ERRADO, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private void sendMailToAllAdmin(String status, String usuario, List<String> allAdmin) {
        allAdmin.remove(jwtFilter.getUsuarioAtual());
        String assunto;
        String texto;

        if (status != null && status.equalsIgnoreCase("true")) {
            // E-mail de aprovação de usuário
            assunto = CafeConstants.ASSUNTO_CONTA_APROVADA;
            texto = "Olá Administrador,\n\n";
            texto += "Gostaríamos de informar que o usuário " + usuario + " foi aprovado por " + jwtFilter.getUsuarioAtual() + ".\n";
            texto += "A partir de agora, o usuário tem acesso ao sistema de gerenciamento de cafés.\n\n";
        } else {
            // E-mail de desativação de usuário
            assunto = CafeConstants.ASSUNTO_CONTA_DESABILITADA;
            texto = "Prezado Administrador,\n\n";
            texto += "Informamos que o acesso do usuário " + usuario + " foi desabilitado por " + jwtFilter.getUsuarioAtual() + ".\n";
            texto += "O usuário não terá mais permissão para acessar o sistema de gerenciamento de cafés.\n\n";
        }

        texto += "Você pode verificar os detalhes do usuário e sua atividade na seção de administrador do sistema.\n\n";
        texto += "Atenciosamente,\n";
        texto += "Equipe de Administração do Sistema";

        // Envia um e-mail para todos os administradores com as informações construídas acima.
        emailUtils.sendSimpleMessage(jwtFilter.getUsuarioAtual(), assunto, texto, allAdmin);
    }


    @Override
    public ResponseEntity<String> checkToken() {
        return CafeUtils.getResponseEntity("true", HttpStatus.OK);
    }

    @Override
    public ResponseEntity<String> changePassword(Map<String, String> requestMap) {
        try {
            Usuario usuarioObj = usuarioDao.findByEmail(jwtFilter.getUsuarioAtual());
            if (!usuarioObj.equals(null)) {
                if (usuarioObj.getSenha().equals(requestMap.get("senhaAntiga"))) {
                    usuarioObj.setSenha(requestMap.get("senhaNova"));
                    usuarioDao.save(usuarioObj);
                    return CafeUtils.getResponseEntity(CafeConstants.SENHA_ATUALIZADA, HttpStatus.OK);
                }
                return CafeUtils.getResponseEntity(CafeConstants.SENHA_ANTIGA_INCORRETA, HttpStatus.BAD_REQUEST);
            }
            return CafeUtils.getResponseEntity(CafeConstants.ALGO_DEU_ERRADO, HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (Exception exception) {

        }
        return CafeUtils.getResponseEntity(CafeConstants.ALGO_DEU_ERRADO, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> forgotPassword(Map<String, String> requestMap) {
        try {
            Usuario usuario = usuarioDao.findByEmail(requestMap.get("email"));
            if (!Objects.isNull(usuario) && !Strings.isNullOrEmpty(usuario.getEmail()))
                emailUtils.forgotMail(usuario.getEmail(), CafeConstants.CRED_GERENC_CAFE, usuario.getSenha());

            return CafeUtils.getResponseEntity(CafeConstants.VERIFICAR_EMAIL, HttpStatus.OK);

        } catch (Exception exception) {
            exception.printStackTrace();
        }
        return CafeUtils.getResponseEntity(CafeConstants.ALGO_DEU_ERRADO, HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
