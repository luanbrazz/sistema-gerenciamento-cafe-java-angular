package com.luan.gerenciamentocafeapi.dao;

import com.luan.gerenciamentocafeapi.DTO.ProdutoDTO;
import com.luan.gerenciamentocafeapi.POJO.Produto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProdutoDao extends JpaRepository<Produto, Integer> {
    List<ProdutoDTO> getAllProduto();
}
