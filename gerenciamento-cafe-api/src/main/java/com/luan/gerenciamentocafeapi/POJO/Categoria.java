package com.luan.gerenciamentocafeapi.POJO;

import lombok.Data;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.io.Serializable;

// Define uma consulta nomeada (NamedQuery) para essa entidade (Categoria)
// A consulta seleciona todas as categorias que possuem pelo menos um produto ativo (com status igual a "true")
//Essa é uma cláusula WHERE com uma subconsulta. A subconsulta (select p.categoria from Produto p where p.status='true')
// seleciona o campo categoria da entidade Produto (representada pelo alias p) onde o campo status é igual a "true".
// Em outras palavras, essa subconsulta recupera os IDs das categorias onde existem produtos ativos (com status igual a "true").
// O operador IN é usado para verificar se o id da categoria atual (c.id) está presente na lista de IDs retornada pela subconsulta.
@NamedQuery(name = "Categoria.getAllCategoria", query = "select c from Categoria c where c.id in  (select p.categoria from Produto p where p.status='true')")

@Data
@Entity
@DynamicInsert
@DynamicUpdate
@Table(name = "categoria")
public class Categoria implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "nome")
    private String nome;
}
