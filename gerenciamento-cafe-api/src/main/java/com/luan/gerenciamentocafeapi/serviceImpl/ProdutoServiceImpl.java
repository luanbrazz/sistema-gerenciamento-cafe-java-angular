package com.luan.gerenciamentocafeapi.serviceImpl;

import com.luan.gerenciamentocafeapi.JWT.JwtFilter;
import com.luan.gerenciamentocafeapi.POJO.Categoria;
import com.luan.gerenciamentocafeapi.POJO.Produto;
import com.luan.gerenciamentocafeapi.constents.CafeConstants;
import com.luan.gerenciamentocafeapi.dao.ProdutoDao;
import com.luan.gerenciamentocafeapi.service.ProdutoService;
import com.luan.gerenciamentocafeapi.utils.CafeUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class ProdutoServiceImpl implements ProdutoService {

    @Autowired
    JwtFilter jwtFilter;

    @Autowired
    ProdutoDao produtoDao;

    @Override
    public ResponseEntity<String> addNewProdruto(Map<String, String> requestMap) {
        try {
            if (jwtFilter.isAdmin()) {
                if (validateProdutoMap(requestMap, false)) {
                    produtoDao.save(getProdutoFromMap(requestMap, false));
                    return CafeUtils.getResponseEntity(CafeConstants.PRODUTO_ADD_SUCESSO, HttpStatus.OK);
                }
                return CafeUtils.getResponseEntity(CafeConstants.DADOS_INVALIDOS, HttpStatus.BAD_REQUEST);
            } else {
                return CafeUtils.getResponseEntity(CafeConstants.ACESSO_NEGADO, HttpStatus.UNAUTHORIZED);
            }
        } catch (Exception exception) {
            exception.printStackTrace();
        }
        return CafeUtils.getResponseEntity(CafeConstants.ALGO_DEU_ERRADO, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private boolean validateProdutoMap(Map<String, String> requestMap, boolean validateId) {
        if (requestMap.containsKey("nome")) {
            if (requestMap.containsKey("id") && validateId) {
                return true;
            } else if (!validateId) {
                return true;
            }
        }
        return false;
    }

    private Produto getProdutoFromMap(Map<String, String> requestMap, boolean isAdd) {
        Categoria categoria = new Categoria();
        categoria.setId(Integer.parseInt(requestMap.get("categoriaId")));

        Produto produto = new Produto();
        if (isAdd) {
            produto.setId(Integer.parseInt(requestMap.get("id")));
        } else {
            produto.setStatus("true");
        }
        produto.setCategoria(categoria);
        produto.setNome(requestMap.get("nome"));
        produto.setDescricao(requestMap.get("descricao"));
        produto.setPreco(Integer.parseInt(requestMap.get("preco")));
        return produto;

    }
}
