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
import { MaterialRoutes } from './material.routing';
import { GerenciarCategoriaComponent } from './gerenciar-categoria/gerenciar-categoria.component';
import { CategoriaComponent } from './dialog/categoria/categoria.component'; // Importa as rotas do módulo
import { MatDialogModule } from '@angular/material/dialog';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { GerenciarProdutoComponent } from './gerenciar-produto/gerenciar-produto.component';
import { ProdutoComponent } from './dialog/produto/produto.component';
import { MatTableModule } from '@angular/material/table';
import { GerenciarOrdemComponent } from './gerenciar-ordem/gerenciar-ordem.component';
import { ViewCompraComponent } from './view-compra/view-compra.component';
import { ViewCompraProdutosComponent } from './dialog/view-compra-produtos/view-compra-produtos.component';
import { GerenciarUsuarioComponent } from './gerenciar-usuario/gerenciar-usuario.component';

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
    CdkTableModule, // Importa o módulo CdkTableModule para tabelas
    MatDialogModule,
    MatTableModule
  ],
  providers: [], // Define os provedores de serviços
  declarations: [
    ConfirmacaoComponent, // Declara o componente ConfirmacaoComponent
    AlterarSenhaComponent, GerenciarCategoriaComponent, CategoriaComponent, GerenciarProdutoComponent, ProdutoComponent, GerenciarOrdemComponent, ViewCompraComponent, ViewCompraProdutosComponent, GerenciarUsuarioComponent // Declara o componente AlterarSenhaComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MaterialComponentsModule { } // Exporta a classe do módulo MaterialComponentsModule
