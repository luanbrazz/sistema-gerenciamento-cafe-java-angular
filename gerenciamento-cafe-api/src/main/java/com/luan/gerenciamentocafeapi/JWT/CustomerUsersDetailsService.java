package com.luan.gerenciamentocafeapi.JWT;

import com.luan.gerenciamentocafeapi.constents.CafeConstants;
import com.luan.gerenciamentocafeapi.dao.UsuarioDao;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Objects;

// Anotação @Slf4j para configuração do registro de logs.
@Slf4j
// Anotação @Service indica que essa classe é um bean gerenciado pelo Spring.
@Service
// Classe que implementa a interface UserDetailsService para fornecer informações do usuário para autenticação do Spring Security.
public class CustomerUsersDetailsService implements UserDetailsService {

    // Injeção de dependência do bean UsuarioDao.
    @Autowired
    UsuarioDao usuarioDao;

    // Variável que irá armazenar as informações do usuário logado.
    private com.luan.gerenciamentocafeapi.POJO.Usuario usuarioDetail;

    // Método sobrescrito da interface UserDetailsService que é responsável por carregar os detalhes do usuário com o nome de usuário fornecido.
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Registro de uma mensagem de log com o nome de usuário que está sendo buscado.
        log.info("Dentro de loadUserByUsername {}", username);
        // Busca o usuário no banco de dados com o e-mail fornecido pelo Spring Security.
        usuarioDetail = usuarioDao.findByEmailId(username);
        // Verifica se o usuário foi encontrado no banco de dados.
        if (!Objects.isNull(usuarioDetail))
            // Caso encontrado, retorna um objeto User (implementação da interface UserDetails) com o e-mail e senha do usuário, e uma lista vazia de autoridades.
            return new User(usuarioDetail.getEmail(), usuarioDetail.getSenha(), new ArrayList<>());
        else
            // Caso o usuário não seja encontrado, lança uma exceção informando que o usuário não foi encontrado.
            throw new UsernameNotFoundException(CafeConstants.USUARIO_NAO_ENCONTRADO);
    }

    // Método que retorna o objeto de usuário encontrado (caso exista) para uso posterior no sistema.
    public com.luan.gerenciamentocafeapi.POJO.Usuario getUsuarioDetail() {
        return usuarioDetail;
    }
}
