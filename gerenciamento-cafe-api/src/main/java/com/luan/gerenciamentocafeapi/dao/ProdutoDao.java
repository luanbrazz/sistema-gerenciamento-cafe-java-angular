package com.luan.gerenciamentocafeapi.dao;

import com.luan.gerenciamentocafeapi.DTO.ProdutoDTO;
import com.luan.gerenciamentocafeapi.POJO.Produto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.util.List;

public interface ProdutoDao extends JpaRepository<Produto, Integer> {
    List<ProdutoDTO> getAllProduto();

    // O método é anotado com @Modifying para indicar que realizará uma modificação no banco de dados
    @Modifying
    // O método também é anotado com @Transactional para garantir que a transação seja tratada adequadamente
    @Transactional
    Integer updateProdutoStatus(@Param("status") String status, @Param("id") Integer id);

    List<ProdutoDTO> getProdutoByCategoria(@Param("id") Integer id);
}