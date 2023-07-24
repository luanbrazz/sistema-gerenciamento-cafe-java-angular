package com.luan.gerenciamentocafeapi.POJO;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.io.Serializable;

// Anotação @NamedQuery usada para definir consultas nomeadas em uma entidade mapeada do JPA.
@NamedQuery(name = "Usuario.findByEmailId", query = "select u from Usuario u where u.email=:email")
@NamedQuery(name = "Usuario.getAllUsuario", query = "select new com.luan.gerenciamentocafeapi.DTO.UsuarioDTO(u.id, u.nome, u.email, u.numeroContato, u.status) from Usuario u where u.role='usuario'")
@NamedQuery(name = "Usuario.getAllAdmin", query = "select u.email from Usuario u where u.role='admin'")
@NamedQuery(name = "Usuario.updateStatus", query = "update Usuario u set u.status=:status where u.id=:id")

// Anotação @Entity indica que essa classe é uma entidade mapeada do JPA
@Entity
// Anotação @DynamicUpdate faz com que a atualização afete apenas as colunas que foram modificadas
@DynamicUpdate
// Anotação @DynamicInsert faz com que a inserção afete apenas as colunas que foram preenchidas
@DynamicInsert
// Mapeia a tabela "Usuario" no banco de dados
@Table(name = "Usuario")
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
