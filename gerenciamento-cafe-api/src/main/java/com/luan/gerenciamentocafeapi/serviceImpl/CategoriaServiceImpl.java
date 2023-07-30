package com.luan.gerenciamentocafeapi.serviceImpl;

import com.google.common.base.Strings;
import com.luan.gerenciamentocafeapi.JWT.JwtFilter;
import com.luan.gerenciamentocafeapi.POJO.Categoria;
import com.luan.gerenciamentocafeapi.constents.CafeConstants;
import com.luan.gerenciamentocafeapi.dao.CategoriaDao;
import com.luan.gerenciamentocafeapi.service.CategoriaService;
import com.luan.gerenciamentocafeapi.utils.CafeUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
public class CategoriaServiceImpl implements CategoriaService {

    @Autowired
    CategoriaDao categoriaDao;

    @Autowired
    JwtFilter jwtFilter;

    @Override
    public ResponseEntity<String> addNewCategoria(Map<String, String> requestMap) {
        try {
            // Verifica se o usuário é um administrador usando o jwtFilter
            if (jwtFilter.isAdmin()) {
                // Valida os dados no mapa da requisição usando o método validateCategoriaMap
                if (validateCategoriaMap(requestMap, false)) {
                    // Salva a nova categoria no banco de dados usando o CategoriaDao
                    categoriaDao.save(getCategoriaFromMap(requestMap, false));
                    // Retorna uma resposta padronizada de sucesso com status 200 - OK
                    return CafeUtils.getResponseEntity(CafeConstants.CATEGORIA_ADD, HttpStatus.OK);
                }
            } else {
                // Retorna uma resposta padronizada de acesso negado com status 401 - UNAUTHORIZED
                return CafeUtils.getResponseEntity(CafeConstants.ACESSO_NEGADO, HttpStatus.UNAUTHORIZED);
            }
        } catch (Exception exception) {
            // Em caso de exceção, imprime o stack trace para fins de depuração
            exception.printStackTrace();
        }
        // Se ocorrer uma exceção, retorna uma resposta padronizada de erro com status 500 - INTERNAL_SERVER_ERROR
        return CafeUtils.getResponseEntity(CafeConstants.ALGO_DEU_ERRADO, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    // Método privado para validar os dados da categoria no mapa da requisição
    private boolean validateCategoriaMap(Map<String, String> requestMap, boolean validateId) {
        if (requestMap.containsKey("nome") && validateId) {
            return true;
        } else if (!validateId) {
            return true;
        }
        return false;
    }

    // Método privado para criar um objeto Categoria a partir do mapa da requisição
    private Categoria getCategoriaFromMap(Map<String, String> requestMap, Boolean isAdd) {
        Categoria categoria = new Categoria();
        if (isAdd) {
            // Se for uma nova categoria (adicionar), define o ID a partir do mapa da requisição
            categoria.setId(Integer.parseInt(requestMap.get("id")));
        }
        // Define o nome da categoria a partir do mapa da requisição
        categoria.setNome(requestMap.get("nome"));
        return categoria;
    }

    @Override
    public ResponseEntity<List<Categoria>> getAllCategoria(String filterValue) {
        try {
            if (!Strings.isNullOrEmpty(filterValue) && filterValue.equalsIgnoreCase("true")) {
                log.info("Entrou no if");
                return new ResponseEntity<List<Categoria>>(categoriaDao.getAllCategoria(), HttpStatus.OK);
            }
            return new ResponseEntity<>(categoriaDao.findAll(), HttpStatus.OK);

        } catch (Exception exception) {
            return new ResponseEntity<List<Categoria>>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
