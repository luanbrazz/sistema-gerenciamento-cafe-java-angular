package com.luan.gerenciamentocafeapi.dao;

import com.luan.gerenciamentocafeapi.DTO.UsuarioDTO;
import com.luan.gerenciamentocafeapi.POJO.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.util.List;

public interface UsuarioDao extends JpaRepository<Usuario, Integer> {

    // Método personalizado para buscar um usuário pelo email
    Usuario findByEmailId(@Param("email") String email);

    List<UsuarioDTO> getAllUsuario();

    List<String> getAllAdmin();

    @Transactional
    @Modifying
    Integer updateStatus(@Param("status") String status, @Param("id") Integer id);
}
