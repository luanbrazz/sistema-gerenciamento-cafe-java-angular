package com.luan.gerenciamentocafeapi.JWT;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.BeanIds;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;

// Anotação @Configuration indica que essa classe é uma classe de configuração do Spring.
@Configuration
// Anotação @EnableWebSecurity habilita a configuração do Spring Security para a aplicação.
@EnableWebSecurity
// Classe que estende WebSecurityConfigurerAdapter para configurar o Spring Security.
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    // Injeção de dependência do bean CustomerUsersDetailsService.
    @Autowired
    CustomerUsersDetailsService customerUserDetailService;

    // Injeção de dependência do bean JwtFilter.
    @Autowired
    JwtFilter jwtFilter;

    // Método sobrescrito para configurar o gerenciador de autenticação do Spring Security.
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        // Define o serviço de detalhes do usuário personalizado (CustomerUsersDetailsService) para o gerenciador de autenticação.
        auth.userDetailsService(customerUserDetailService);
    }

    // Método que retorna um bean para o encoder de senha. NoOpPasswordEncoder é usado aqui apenas para fins didáticos e não deve ser usado em ambientes de produção.
    @Bean
    public PasswordEncoder passwordEncoder() {
        return NoOpPasswordEncoder.getInstance();
    }

    // Método que retorna o bean do gerenciador de autenticação para ser usado em outras partes da aplicação.
    @Bean(name = BeanIds.AUTHENTICATION_MANAGER)
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    // Método sobrescrito para configurar as regras de segurança HTTP para a aplicação.
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .cors() // Habilita a configuração de CORS (Cross-Origin Resource Sharing).
                .configurationSource(request -> new CorsConfiguration().applyPermitDefaultValues()) // Configura a política CORS para permitir que qualquer origem acesse a API.
                .and()
                .csrf().disable() // Desabilita a proteção contra ataques CSRF (Cross-Site Request Forgery), pois a API usará autenticação baseada em token JWT (stateless).
                .authorizeRequests() // Configura as autorizações para diferentes rotas.
                .antMatchers("/usuario/login", "/usuario/signup", "/usuario/forgotPassword")
                .permitAll() // Permite acesso público às rotas de login, cadastro e recuperação de senha.
                .anyRequest()
                .authenticated() // Exige autenticação para todas as outras rotas (que não foram especificadas anteriormente).
                .and()
                .exceptionHandling() // Configura como tratar exceções durante o processo de autenticação e autorização.
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS); // Configura a política de gerenciamento de sessão como stateless (sem sessão).

        http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class); // Adiciona o filtro JwtFilter antes do filtro de autenticação padrão.
    }

}
