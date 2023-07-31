package com.luan.gerenciamentocafeapi.POJO;

import lombok.Data;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.io.Serializable;

@NamedQuery(name = "Produto.getAllProduto", query = "select new com.luan.gerenciamentocafeapi.DTO.ProdutoDTO(p.id,p.nome,p.descricao,p.preco,p.status,p.categoria.id,p.categoria.nome) from Produto p")

@NamedQuery(name = "Produto.updateProdutoStatus", query = "update Produto p set p.status=:status where p.id=:id")

@Data
@Entity
@DynamicInsert
@DynamicUpdate
@Table(name = "produto")
public class Produto implements Serializable {

    public static final Long serialVersionUid = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "nome")
    private String nome;

    //    fetch = FetchType.LAZY: Essa configuração controla como o carregamento dos dados associados é realizado. Com LAZY,
//    o carregamento da "Categoria" é adiado até que seja realmente necessário, ou seja, ela será carregada apenas
//    quando for acessada pela primeira vez. Essa é uma estratégia de carregamento preguiçosa, que pode ajudar a
//    melhorar o desempenho, especialmente quando você tem muitos relacionamentos e nem sempre precisa acessar todas
//    as informações associadas.
    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "categoria_fk", nullable = false): Essa anotação é usada para especificar o mapeamento do campo
//    da chave estrangeira no banco de dados.
//    name = "categoria_fk": Aqui, é fornecido o nome da coluna no banco de dados que será usada para armazenar a chave
//    estrangeira que relaciona a entidade atual com a "Categoria". No exemplo, o nome da coluna é "categoria_fk".
//    nullable = false: Essa configuração indica que o campo da chave estrangeira não pode ser nulo, ou seja, sempre
//    deve haver uma referência válida à "Categoria" associada a cada registro da classe atual. Portanto, o valor dessa
//    coluna não pode ser nulo no banco de dados.
    @JoinColumn(name = "categoria_fk", nullable = false)
    private Categoria categoria;

    @Column(name = "descricao")
    private String descricao;

    @Column(name = "preco")
    private Integer preco;

    @Column(name = "status")
    private String status;
}
