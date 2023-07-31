package com.luan.gerenciamentocafeapi.dao;

import com.luan.gerenciamentocafeapi.POJO.Produto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProdutoDao extends JpaRepository<Produto, Integer> {
}
