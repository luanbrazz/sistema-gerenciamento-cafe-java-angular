package com.luan.gerenciamentocafeapi.dao;

import com.luan.gerenciamentocafeapi.POJO.Compra;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CompraDao extends JpaRepository<Compra, Integer> {

    List<Compra> getAllCompra();

    List<Compra> getCompraByUsername(@Param("username") String username);
}
