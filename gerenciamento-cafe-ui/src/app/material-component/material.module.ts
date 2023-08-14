// Importações necessárias do Angular
import { CdkTableModule } from '@angular/cdk/table'; // Importa o módulo CdkTableModule para tabelas
import { CommonModule } from '@angular/common'; // Importa o módulo CommonModule
import { HttpClientModule } from '@angular/common/http'; // Importa o módulo HttpClientModule para chamadas HTTP
import { NgModule } from '@angular/core'; // Importa a classe NgModule para criar um módulo
import { FlexLayoutModule } from '@angular/flex-layout'; // Importa o módulo FlexLayoutModule para layout flexível
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Importa módulos para lidar com formulários
import { RouterModule } from '@angular/router'; // Importa o módulo RouterModule para lidar com roteamento

// Importações personalizadas
import { MaterialModule } from '../shared/material-module'; // Importa um módulo MaterialModule personalizado
import { AlterarSenhaComponent } from './dialog/alterar-senha/alterar-senha.component'; // Importa um componente personalizado
import { ConfirmacaoComponent } from './dialog/confirmacao/confirmacao.component'; // Importa um componente personalizado
import { ViewBillProductsComponent } from './dialog/view-bill-products/view-bill-products.component'; // Importa um componente personalizado
import { MaterialRoutes } from './material.routing'; // Importa as rotas do módulo

// Decoração do módulo MaterialComponentsModule
@NgModule({
  imports: [
    CommonModule, // Importa o módulo CommonModule para funcionalidades comuns
    RouterModule.forChild(MaterialRoutes), // Define as rotas específicas do módulo
    MaterialModule, // Importa o módulo MaterialModule personalizado
    HttpClientModule, // Importa o módulo HttpClientModule para chamadas HTTP
    FormsModule, // Importa o módulo FormsModule para lidar com formulários
    ReactiveFormsModule, // Importa o módulo ReactiveFormsModule para lidar com formulários reativos
    FlexLayoutModule, // Importa o módulo FlexLayoutModule para layout flexível
    CdkTableModule // Importa o módulo CdkTableModule para tabelas
  ],
  providers: [], // Define os provedores de serviços
  declarations: [
    ViewBillProductsComponent, // Declara o componente ViewBillProductsComponent
    ConfirmacaoComponent, // Declara o componente ConfirmacaoComponent
    AlterarSenhaComponent // Declara o componente AlterarSenhaComponent
  ]
})
export class MaterialComponentsModule { } // Exporta a classe do módulo MaterialComponentsModule
