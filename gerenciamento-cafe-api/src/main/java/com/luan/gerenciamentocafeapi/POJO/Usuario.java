package com.luan.gerenciamentocafeapi.POJO;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.io.Serializable;

//@Data Anotação do Lombok que gera automaticamente os métodos toString, equals, hashCode, getters e setters
//@NoArgsConstructor // Gera um construtor sem argumentos
//@AllArgsConstructor // Gera um construtor com todos os argumentos

@NamedQuery(name = "Usuario.findByEmailId", query = "select u from Usuario u where u.email=:email")
//A anotação @NamedQuery é usada para definir consultas nomeadas em uma entidade mapeada do JPA. Essas consultas são
// consultas pré-definidas que podem ser facilmente referenciadas por um nome em vez de escrever a consulta completa
// toda vez que ela for necessária.

@NamedQuery(name = "Usuario.getAllUsuario", query = "select new com.luan.gerenciamentocafeapi.DTO.UsuarioDTO(u.id, u.nome, u.email, u.numeroContato, u.status) from Usuario u where u.role='usuario'")

@Entity // Indica que essa classe é uma entidade mapeada do JPA
@DynamicUpdate // Atualiza apenas as colunas que foram modificadas
@DynamicInsert // Insere apenas as colunas que foram preenchidas
@Table(name = "Usuario") // Mapeia a tabela "Usuario" no banco de dados
public class Usuario implements Serializable {

    private static final long serialVersionUID=1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private  Integer id;

    @Column(name = "nome")
    private String nome;

    @Column(name = "numeroContato")
    private String numeroContato;

    @Column(name = "email")
    private String email;

    @Column(name = "senha")
    private String senha;

    @Column(name = "status")
    private String status;

    @Column(name = "role")
    private String role;

    public Usuario() {
    }

    public Usuario(String nome, String numeroContato, String email, String senha, String status, String role) {
        this.nome = nome;
        this.numeroContato = numeroContato;
        this.email = email;
        this.senha = senha;
        this.status = status;
        this.role = role;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getNumeroContato() {
        return numeroContato;
    }

    public void setNumeroContato(String numeroContato) {
        this.numeroContato = numeroContato;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
