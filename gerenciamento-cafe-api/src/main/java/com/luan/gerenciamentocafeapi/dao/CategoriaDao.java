package com.luan.gerenciamentocafeapi.dao;

import com.luan.gerenciamentocafeapi.POJO.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CategoriaDao extends JpaRepository<Categoria, Integer> {

    List<Categoria> getAllCategoria();
}
