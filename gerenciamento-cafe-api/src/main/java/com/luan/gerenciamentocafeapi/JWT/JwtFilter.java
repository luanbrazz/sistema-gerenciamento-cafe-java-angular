package com.luan.gerenciamentocafeapi.JWT;

import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

// Anotação @Component indica que essa classe é um bean gerenciado pelo Spring.
@Component
// Classe que estende OncePerRequestFilter, garantindo que esse filtro seja executado apenas uma vez para cada solicitação.
public class JwtFilter extends OncePerRequestFilter {

    // Injeção de dependência do bean JwtUtil.
    @Autowired
    private JwtUtil jwtUtil;

    // Injeção de dependência do bean CustomerUsersDetailsService.
    @Autowired
    private CustomerUsersDetailsService service;

    // Variáveis para armazenar os dados do token JWT e o nome de usuário.
    Claims claims = null;
    private String nomeUsuario = null;

    // Método sobrescrito do OncePerRequestFilter, responsável por filtrar as solicitações.
    @Override
    protected void doFilterInternal(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, FilterChain filterChain) throws ServletException, IOException {
        // Verifica se a solicitação atual está relacionada a rotas de login, recuperação de senha ou cadastro de usuário.
        if (httpServletRequest.getServletPath().matches(("/usuario/login|/usuario/forgotPassword|/usuario/signup"))) {
            // Caso seja uma dessas rotas, o filtro não é aplicado e a solicitação segue o fluxo normal.
            filterChain.doFilter(httpServletRequest, httpServletResponse);
        } else {
            // Caso contrário, prossegue com o filtro para verificar o token JWT e autenticar o usuário.

            // Obtém o token JWT do cabeçalho de autorização da solicitação.
            String authorizationHeader = httpServletRequest.getHeader("Authorization");
            String token = null;

            // Verifica se o cabeçalho de autorização existe e contém o prefixo "Bearer ".
            if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
                // Caso sim, extrai o token do cabeçalho removendo o prefixo.
                token = authorizationHeader.substring(7);
                // Extrai o nome de usuário do token.
                nomeUsuario = jwtUtil.extrairNomeUsuario(token);
                // Extrai todas as reivindicações (claims) do token.
                claims = jwtUtil.extractAllClaims(token);
            }

            // Verifica se o nome de usuário foi extraído com sucesso do token e se o usuário ainda não está autenticado no contexto de segurança do Spring.
            if (nomeUsuario != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                // Carrega os detalhes do usuário do banco de dados com o nome de usuário extraído do token.
                UserDetails userDetails = service.loadUserByUsername(nomeUsuario);
                // Valida o token JWT para garantir que ele é autêntico e válido para o usuário.
                if (jwtUtil.validateToken(token, userDetails)) {
                    // Cria um objeto UsernamePasswordAuthenticationToken com o usuário autenticado, nenhuma credencial (pois o token JWT é a credencial) e as autoridades do usuário.
                    UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken =
                            new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                    // Define os detalhes da autenticação, como endereço IP e detalhes do navegador.
                    usernamePasswordAuthenticationToken.setDetails(
                            new WebAuthenticationDetailsSource().buildDetails(httpServletRequest)
                    );
                    // Define o objeto UsernamePasswordAuthenticationToken como a autenticação atual no contexto de segurança do Spring.
                    SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
                }
            }
            // Prossegue com a cadeia de filtros.
            filterChain.doFilter(httpServletRequest, httpServletResponse);
        }
    }

    // Método que verifica se o usuário autenticado é um administrador.
    public boolean isAdmin() {
        return "admin".equalsIgnoreCase((String) claims.get("role"));
    }

    // Método que verifica se o usuário autenticado é um usuário comum.
    public boolean isUsuario() {
        return "usuario".equalsIgnoreCase((String) claims.get("role"));
    }

    // Método que retorna o nome do usuário atualmente autenticado.
    public String getUsuarioAtual() {
        return nomeUsuario;
    }
}
