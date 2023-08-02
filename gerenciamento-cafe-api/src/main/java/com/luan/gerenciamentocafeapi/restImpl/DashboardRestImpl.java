package com.luan.gerenciamentocafeapi.restImpl;

import com.luan.gerenciamentocafeapi.rest.DashboardRest;
import com.luan.gerenciamentocafeapi.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class DashboardRestImpl implements DashboardRest {

    @Autowired
    DashboardService dashboardService;

    @Override
    public ResponseEntity<Map<String, Object>> getContagem() {
        return dashboardService.getContagem();
    }
}
