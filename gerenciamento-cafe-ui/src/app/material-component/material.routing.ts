// Importa a classe 'Routes' do módulo '@angular/router'
import { Routes } from '@angular/router';

// Importa o componente 'DashboardComponent'
import { DashboardComponent } from '../dashboard/dashboard.component';

// Importa o componente 'GerenciarCategoriaComponent'
import { GerenciarCategoriaComponent } from './gerenciar-categoria/gerenciar-categoria.component';

// Importa o serviço 'RouteGuardService'
import { RouteGuardService } from '../services/route-guard.service';
import { GerenciarProdutoComponent } from './gerenciar-produto/gerenciar-produto.component';
import { GerenciarOrdemComponent } from './gerenciar-ordem/gerenciar-ordem.component';
import { ViewCompraComponent } from './view-compra/view-compra.component';

// Exporta uma constante chamada 'MaterialRoutes' que é um array de rotas
export const MaterialRoutes: Routes = [
  {
    path: 'categoria', // Define o caminho da URL para esta rota
    component: GerenciarCategoriaComponent, // Associa o componente 'GerenciarCategoriaComponent' a esta rota
    canActivate: [RouteGuardService], // Especifica que 'RouteGuardService' será usado para proteger esta rota
    data: {
      // Define metadados adicionais para esta rota
      expectedRole: ['admin'], // Especifica que se espera que o usuário tenha a role 'admin' para acessar esta rota
    },
  },
  {
    path: 'produto',
    component: GerenciarProdutoComponent,
    canActivate: [RouteGuardService],
    data: {
      expectedRole: ['admin'],
    },
  },
  {
    path: 'ordem',
    component: GerenciarOrdemComponent,
    canActivate: [RouteGuardService],
    data: {
      expectedRole: ['admin', 'usuario'],
    },
  },
  {
    path: 'compra',
    component: ViewCompraComponent,
    canActivate: [RouteGuardService],
    data: {
      expectedRole: ['admin', 'usuario'],
    },
  },
];
