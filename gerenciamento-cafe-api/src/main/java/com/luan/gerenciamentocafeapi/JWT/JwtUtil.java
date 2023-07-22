package com.luan.gerenciamentocafeapi.JWT;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

// Anotação @Service indica que essa classe é um bean de serviço gerenciado pelo Spring.
@Service
public class JwtUtil {
    private String secret = "btechdays"; // Chave secreta usada para assinar os tokens JWT.

    // Método que extrai o nome de usuário do token JWT.
    public String extrairNomeUsuario(String token) {
        return extractClaims(token, Claims::getSubject);
    }

    // Método que extrai a data de expiração do token JWT.
    public Date extractExpiration(String token) {
        return extractClaims(token, Claims::getExpiration);
    }

    // Método genérico que extrai reivindicações (claims) do token JWT usando uma função passada como parâmetro.
    public <T> T extractClaims(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    // Método que extrai todas as reivindicações (claims) do token JWT.
    public Claims extractAllClaims(String token) {
        return Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
    }

    // Método privado que verifica se o token JWT está expirado.
    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    // Método que gera um novo token JWT com base no nome de usuário e na função do usuário (role) fornecidos.
    public String generateToken(String nomeUsuario, String role) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("role", role);
        return createToken(claims, nomeUsuario);
    }

    // Método privado que cria o token JWT com as reivindicações, nome de usuário e outras informações necessárias.
    private String createToken(Map<String, Object> claims, String subject) {
        return Jwts.builder()
                .setClaims(claims) // Define as reivindicações (claims) do token.
                .setSubject(subject) // Define o assunto do token, neste caso, o nome de usuário.
                .setIssuedAt(new Date(System.currentTimeMillis())) // Define a data de emissão do token como a data atual.
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10)) // Define a data de expiração do token como 10 horas após a data atual.
                .signWith(SignatureAlgorithm.HS256, secret) // Define o algoritmo de assinatura e a chave secreta para assinar o token.
                .compact(); // Compila o token JWT em sua representação de string.
    }

    // Método que valida o token JWT verificando se o nome de usuário contido no token é igual ao nome de usuário fornecido pelo UserDetails e se o token não está expirado.
    public Boolean validateToken(String token, UserDetails userDetails) {
        final String nomeUsuario = extrairNomeUsuario(token);
        return (nomeUsuario.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }
}
