package com.luan.gerenciamentocafeapi.dao;

import com.luan.gerenciamentocafeapi.POJO.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

public interface UsuarioDao extends JpaRepository<Usuario, Integer> {

    // Método personalizado para buscar um usuário pelo email
    Usuario findByEmailId(@Param("email") String email);

}
