// Importa o NgModule, que é usado para criar um módulo Angular.
import { NgModule } from '@angular/core';

// Importa os recursos necessários do módulo de roteamento do Angular.
import { RouterModule, Routes } from '@angular/router';

// Importa o componente HomeComponent.
import { HomeComponent } from './home/home.component';

// Importa o componente FullComponent.
import { FullComponent } from './layouts/full/full.component';
import { RouteGuardService } from './services/route-guard.service';

// Define uma constante chamada "routes" que contém a configuração das rotas da aplicação.
const routes: Routes = [
  // Rota raiz que direciona para o componente HomeComponent.
  { path: '', component: HomeComponent },

  // Rota que começa com "cafe" e utiliza o componente FullComponent.
  {
    path: 'cafe',
    component: FullComponent,
    children: [
      // Quando a rota é exatamente "cafe", redireciona para "/cafe/dashboard".
      {
        path: '',
        redirectTo: '/cafe/dashboard',
        pathMatch: 'full',
      },

      // Rota lazy-loaded que carrega o módulo MaterialComponentsModule quando acessada.
      {
        path: '',
        loadChildren:
          () => import('./material-component/material.module').then(m => m.MaterialComponentsModule),
        canActivate: [RouteGuardService],
        data: {
          expectedRole: ['admin', 'usuario']
        }
      },

      // Rota lazy-loaded que carrega o módulo DashboardModule quando "cafe/dashboard" é acessada.
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate: [RouteGuardService],
        data: {
          expectedRole: ['admin', 'usuario']
        }
      }
    ]
  },

  // Rota coringa que pega todos os caminhos não definidos e redireciona para o componente HomeComponent.
  { path: '**', component: HomeComponent }
];

// Define um novo módulo chamado AppRoutingModule.
@NgModule({
  // Configura o RouterModule para usar as rotas definidas anteriormente.
  imports: [RouterModule.forRoot(routes)],

  // Exporta o RouterModule para que outros módulos possam usar as rotas definidas.
  exports: [RouterModule]
})
export class AppRoutingModule { }
