// Importando Component e OnInit de @angular/core para criar e inicializar o componente
import { Component, OnInit } from '@angular/core';
// Importando MatDialog e MatDialogConfig de @angular/material/dialog para trabalhar com diálogos modais
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
// Importando MatTableDataSource de @angular/material/table para manipular os dados da tabela de categorias
import { MatTableDataSource } from '@angular/material/table';
// Importando Router de @angular/router para trabalhar com roteamento e navegação
import { Router } from '@angular/router';
// Importando NgxUiLoaderService de ngx-ui-loader para controle de um loader/spinner de UI
import { NgxUiLoaderService } from 'ngx-ui-loader';
// Importando CategoriaService de um caminho relativo para lidar com operações relacionadas à categoria
import { CategoriaService } from 'src/app/services/categoria.service';
// Importando SnackbarService de um caminho relativo para mostrar notificações na tela
import { SnackbarService } from 'src/app/services/snackbar.service';
// Importando ConstantesGeral de um caminho relativo que contém constantes usadas em todo o projeto
import { ConstantesGeral } from 'src/app/shared/constantes-geral';
// Importando CategoriaComponent de um caminho relativo que representa uma janela de diálogo para adicionar ou editar categorias
import { CategoriaComponent } from '../dialog/categoria/categoria.component';

// Decorator que marca a classe como um componente e fornece metadados de configuração
@Component({
  selector: 'app-gerenciar-categoria', // O seletor CSS que identifica este componente na template
  templateUrl: './gerenciar-categoria.component.html', // O local do arquivo HTML que é usado como template do componente
  styleUrls: ['./gerenciar-categoria.component.scss'] // Os arquivos CSS usados neste componente
})
// Exportando a classe GerenciarCategoriaComponent e implementando a interface OnInit
export class GerenciarCategoriaComponent implements OnInit {

  // Propriedade para controlar as colunas que serão exibidas na tabela
  displayedColumns: string[] = ['nome', 'editar'];

  // Propriedade para guardar os dados que serão exibidos na tabela
  dataSource: any;

  // Propriedade para guardar mensagens de resposta do servidor
  respostaMensagem: any;

  // Construtor do componente, com várias dependências que serão injetadas
  constructor(
    private categoriaService: CategoriaService, // Injeta o serviço de categoria
    private ngxUiLoaderService: NgxUiLoaderService, // Injeta o serviço de UI loader
    private matDialog: MatDialog, // Injeta o serviço de diálogo
    private snackbarService: SnackbarService, // Injeta o serviço de snackbar
    private router: Router, // Injeta o serviço de roteamento
  ) { }

  // Método chamado quando o componente é inicializado
  ngOnInit(): void {
    // Inicia o loader/spinner de UI
    this.ngxUiLoaderService.start();

    // Carrega os dados que serão exibidos na tabela
    this.carregaDadosTabela();
  }

  // Método para carregar os dados que serão exibidos na tabela
  carregaDadosTabela() {
    // Chama o método getAllCategoria do serviço categoriaService
    this.categoriaService.getAllCategoria().subscribe((resp: any) => {
      // Para o loader/spinner de UI quando os dados são recebidos
      this.ngxUiLoaderService.stop();

      // Instancia um novo MatTableDataSource com os dados da resposta e atribui à propriedade dataSource
      this.dataSource = new MatTableDataSource(resp);
    }, (error) => {
      // Para o loader/spinner de UI em caso de erro
      this.ngxUiLoaderService.stop();

      // Loga o erro no console
      console.log("Erro ao buscar dados da tabela", error);

      // Verifica se há uma mensagem de erro na resposta, senão, usa uma mensagem genérica
      this.respostaMensagem = error.error?.message || ConstantesGeral.erroGenerico;

      // Usa o serviço snackbarService para mostrar a mensagem de erro na tela
      this.snackbarService.openSnackBar(this.respostaMensagem, ConstantesGeral.error);
    })
  }

  // Método para aplicar um filtro na tabela de categorias
  aplicarFiltro(event: Event) {
    // Obtém o valor do filtro a partir do evento
    const valorFiltro = (event.target as HTMLInputElement).value;

    // Aplica o filtro aos dados da tabela
    this.dataSource.filter = valorFiltro.trim().toLowerCase();
  }

  // Método para lidar com a ação de adicionar uma nova categoria
  handleAddAction() {
    // Configuração inicial para o diálogo
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'Adicionar'
    };
    dialogConfig.width = "850px";

    // Abre o diálogo para adicionar uma categoria
    const dialogRef = this.matDialog.open(CategoriaComponent, dialogConfig);

    // Fecha o diálogo quando ocorre um evento de navegação
    this.router.events.subscribe(() => {
      dialogRef.close();
    });

    // Se inscreve para tratar o fechamento do diálogo
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.carregaDadosTabela();
      }
    });
  }

  // Método para lidar com a ação de editar uma categoria existente
  handleEditAction(valores: any) {
    // Configuração inicial para o diálogo
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'Editar', // A ação que o diálogo deve realizar ('Editar', neste caso)
      data: valores     // Os dados da categoria que o usuário deseja editar
    };
    dialogConfig.width = "850px";

    // Abre o diálogo para editar uma categoria, passando as configurações que acabamos de definir
    const dialogRef = this.matDialog.open(CategoriaComponent, dialogConfig);

    // Fecha o diálogo quando ocorre um evento de navegação
    this.router.events.subscribe(() => {
      dialogRef.close();
    });

    // Se inscreve para tratar o fechamento do diálogo
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Recarrega os dados da tabela se o diálogo foi fechado com um resultado positivo
        this.carregaDadosTabela();
      }
    });
  }

}
