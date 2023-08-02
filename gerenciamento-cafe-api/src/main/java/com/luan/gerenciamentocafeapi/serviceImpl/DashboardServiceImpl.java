package com.luan.gerenciamentocafeapi.serviceImpl;

import com.luan.gerenciamentocafeapi.dao.CategoriaDao;
import com.luan.gerenciamentocafeapi.dao.CompraDao;
import com.luan.gerenciamentocafeapi.dao.ProdutoDao;
import com.luan.gerenciamentocafeapi.dao.UsuarioDao;
import com.luan.gerenciamentocafeapi.service.DashboardService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@Service
public class DashboardServiceImpl implements DashboardService {

    @Autowired
    CategoriaDao categoriaDao;

    @Autowired
    ProdutoDao produtoDao;

    @Autowired
    CompraDao compraDao;

    @Autowired
    UsuarioDao usuarioDao;

    @Override
    public ResponseEntity<Map<String, Object>> getContagem() {
        Map<String, Object> map = new HashMap<>();
        map.put("categoria", categoriaDao.count());
        map.put("produto", produtoDao.count());
        map.put("compra", compraDao.count());
        map.put("usuario", usuarioDao.count());
        return new ResponseEntity<>(map, HttpStatus.OK);
    }
}
