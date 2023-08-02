package com.luan.gerenciamentocafeapi.POJO;

import lombok.Data;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.io.Serializable;

@NamedQuery(name = "Compra.getAllCompra", query = "select c from Compra c order by c.id desc")

@NamedQuery(name = "Compra.getCompraByUsername", query = "select c from Compra c where c.criadoPor=:username order by c.id desc")

@Data
@Entity
@DynamicInsert
@DynamicUpdate
@Table(name = "compra")
public class Compra implements Serializable {
    public static final Long serialVersionUid = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "uuid")
    private String uuid;

    @Column(name = "nome")
    private String nome;

    @Column(name = "email")
    private String email;

    @Column(name = "numeroContato")
    private String numeroContato;

    @Column(name = "pagamento")
    private String pagamento;

    @Column(name = "totalCompra")
    private Integer totalCompra;

    //    detalheProduto será armazenado em formato JSON na coluna detalheProduto da tabela.
    @Column(name = "detalheProduto", columnDefinition = "json")
    private String detalheProduto;

    @Column(name = "criadoPor")
    private String criadoPor;
}
