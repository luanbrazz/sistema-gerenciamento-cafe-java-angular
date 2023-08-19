import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Subscription } from 'rxjs';
import { ProdutoService } from 'src/app/services/produto.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { ConstantesGeral } from 'src/app/shared/constantes-geral';

import { ConfirmacaoComponent } from '../dialog/confirmacao/confirmacao.component';
import { ProdutoComponent } from '../dialog/produto/produto.component';

@Component({
  selector: 'app-gerenciar-produto', // O nome da tag HTML para esse componente.
  templateUrl: './gerenciar-produto.component.html', // A localização do arquivo HTML do componente.
  styleUrls: ['./gerenciar-produto.component.scss'] // A localização dos arquivos de estilo para esse componente.
})
// A classe GerenciarProdutoComponent implementa a interface OnInit, que tem um método para ser chamado quando o componente é inicializado.
export class GerenciarProdutoComponent implements OnInit {

  // Define as colunas que serão exibidas na tabela.
  displayedColumns: string[] = ['nome', 'nomeCategoria', 'descricao', 'preco', 'editar']

  // Variável para armazenar os dados que serão exibidos na tabela.
  dataSource: any;

  // Array para armazenar as subscrições do componente.
  private subscriptions: Subscription[] = [];

  // Variável para armazenar mensagens de resposta (possivelmente de erro).
  respostaMensagem: any;

  // O construtor desse componente, onde os serviços são injetados.
  constructor(
    private produtoService: ProdutoService,
    private ngxUiLoaderService: NgxUiLoaderService,
    private matDialog: MatDialog,
    private snackbarService: SnackbarService,
    private router: Router,
  ) { }

  // Método que é chamado quando o componente é inicializado. Parte do ciclo de vida do componente.
  ngOnInit(): void {
    this.ngxUiLoaderService.start(); // Inicia o loader/spinner.
    this.carregarDadosTabela(); // Chama o método para carregar os dados na tabela.
  }

  // Método para carregar os dados dos produtos na tabela.
  carregarDadosTabela() {
    this.produtoService.getAllProduto().subscribe((resp: any) => {
      this.ngxUiLoaderService.stop(); // Para o loader/spinner quando a resposta é recebida.
      this.dataSource = new MatTableDataSource(resp); // Atribui os dados recebidos ao dataSource da tabela.
    }, (error: any) => {
      this.ngxUiLoaderService.stop(); // Para o loader/spinner em caso de erro.
      // Log e tratamento do erro.
      console.log('Erro ao buscar dados da tabela', error);
      // Define a mensagem de resposta com base no erro recebido.
      if (error.error?.message) {
        this.respostaMensagem = error.error?.message;
      } else {
        this.respostaMensagem = ConstantesGeral.erroGenerico;
      }
      // Exibe a mensagem de erro usando o snackbar.
      this.snackbarService.openSnackBar(this.respostaMensagem, ConstantesGeral.error);
    })
  }

  // Método que é acionado quando o usuário tenta filtrar os dados na tabela.
  aplicarFiltro(event: Event) {
    const valorFiltro = (event.target as HTMLInputElement).value; // Pega o valor inserido no input.
    this.dataSource.filter = valorFiltro.trim().toLowerCase(); // Aplica o filtro aos dados da tabela.
  }

  // Método para lidar com a ação de adicionar um novo produto.
  handleAddAction() {
    const matDialogConfig = new MatDialogConfig(); // Cria uma nova configuração para o modal.
    matDialogConfig.data = { // Passa dados para o modal.
      action: 'Adicionar'
    };
    matDialogConfig.width = "850px"; // Define a largura do modal.
    const dialogRef = this.matDialog.open(ProdutoComponent, matDialogConfig); // Abre o modal com o componente ProdutoComponent.
    // Se algo acontecer com as rotas, fecha o modal.
    this.router.events.subscribe(() => {
      dialogRef.close();
    });
    // Quando o ProdutoComponent emitir o evento onAddProduto, recarrega os dados da tabela.
    const sub = dialogRef.componentInstance.onAddProduto.subscribe((response: any) => {
      this.carregarDadosTabela();
    });
    // Adiciona a subscrição ao array de subscrições para gerenciamento futuro.
    this.subscriptions.push(sub);
  }

  // Método para lidar com a ação de editar um produto existente.
  handleEditAction(valores: any) {
    const matDialogConfig = new MatDialogConfig(); // Cria uma nova configuração para o modal.
    matDialogConfig.data = { // Passa dados para o modal.
      action: 'Editar',
      data: valores
    };
    matDialogConfig.width = "850px"; // Define a largura do modal.
    const dialogRef = this.matDialog.open(ProdutoComponent, matDialogConfig); // Abre o modal com o componente ProdutoComponent.

    // Se algo acontecer com as rotas, fecha o modal.
    this.router.events.subscribe(() => {
      dialogRef.close();
    });

    // Quando o ProdutoComponent emitir o evento onEditProduto, recarrega os dados da tabela.
    const sub = dialogRef.componentInstance.onEditProduto.subscribe((response: any) => {
      this.carregarDadosTabela();
    })
    // Adiciona a subscrição ao array de subscrições para gerenciamento futuro.
    this.subscriptions.push(sub);
  }

  // Método que será chamado quando o componente for destruído. Parte do ciclo de vida do componente.
  ngOnDestroy(): void {
    // Itera sobre todas as subscrições e as cancela para evitar vazamentos de memória.
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  // Método para lidar com a ação de deletar um produto existente.
  handleDeleteAction(valores: any) {
    const matDialogConfig = new MatDialogConfig(); // Cria uma nova configuração para o modal.
    matDialogConfig.data = { // Passa dados para o modal.
      mensagem: 'deletar o produto ' + valores.nome,
      confirmation: true
    }

    // Abre o modal de confirmação para a ação de deletar.
    const dialogRef = this.matDialog.open(ConfirmacaoComponent, matDialogConfig);
    const sub = dialogRef.componentInstance.onEmitStatusChange.subscribe((response) => {
      this.ngxUiLoaderService.start(); // Inicia o loader/spinner.
      this.deletarProduto(valores.id); // Chama o método para deletar o produto.
      dialogRef.close(); // Fecha o modal de confirmação.
    })
  }

  // Método para enviar uma requisição para deletar um produto pelo ID.
  deletarProduto(id: any) {
    this.produtoService.deleteProduto(id).subscribe((resp: any) => {
      this.ngxUiLoaderService.stop(); // Para o loader/spinner quando a resposta é recebida.
      this.carregarDadosTabela(); // Recarrega os dados da tabela após deletar o produto.
      this.respostaMensagem = resp?.mensagem; // Define a mensagem de resposta com base na resposta recebida.
      this.snackbarService.openSnackBar(this.respostaMensagem, ConstantesGeral.success); // Exibe a mensagem de sucesso usando o snackbar.
    }, (error: any) => {
      // Tratamento de erro quando a requisição para deletar falha.
      this.ngxUiLoaderService.stop(); // Para o loader/spinner em caso de erro.
      // Log e tratamento do erro.
      console.log('erro ao excluir o produto');
      console.log('Erro ao buscar dados da tabela', error);
      // Define a mensagem de resposta com base no erro recebido.
      if (error.error?.message) {
        this.respostaMensagem = error.error?.message;
      } else {
        this.respostaMensagem = ConstantesGeral.erroGenerico;
      }
      // Exibe a mensagem de erro usando o snackbar.
      this.snackbarService.openSnackBar(this.respostaMensagem, ConstantesGeral.error);
    })
  }

  // Método para atualizar o status de um produto.
  onAtivaDesativa(status: any, id: any) {
    this.ngxUiLoaderService.start(); // Inicia o loader/spinner.
    var dados = {
      status: status.toString(),
      id: id
    }

    // Envia uma requisição para atualizar o status de um produto.
    this.produtoService.updateStatus(dados).subscribe((resp: any) => {
      this.ngxUiLoaderService.stop(); // Para o loader/spinner quando a resposta é recebida.
      this.carregarDadosTabela(); // Recarrega os dados da tabela após atualizar o status do produto.
      this.respostaMensagem = resp?.mensagem; // Define a mensagem de resposta com base na resposta recebida.
      this.snackbarService.openSnackBar(this.respostaMensagem, ConstantesGeral.success); // Exibe a mensagem de sucesso usando o snackbar.
    }, (error: any) => {
      // Tratamento de erro quando a requisição para atualizar o status falha.
      this.ngxUiLoaderService.stop(); // Para o loader/spinner em caso de erro.
      // Define a mensagem de resposta com base no erro recebido.
      if (error.error?.message) {
        this.respostaMensagem = error.error?.message;
      } else {
        this.respostaMensagem = ConstantesGeral.erroGenerico;
      }
      // Exibe a mensagem de erro usando o snackbar.
      this.snackbarService.openSnackBar(this.respostaMensagem, ConstantesGeral.error);
    })
  }

  // Método para formatar o preço para o padrão brasileiro.
  formatPrice(price: number): string {
    return `R$ ${price.toFixed(2)}`; // `toFixed(2)` garante que sempre teremos duas casas decimais.
  }

}


