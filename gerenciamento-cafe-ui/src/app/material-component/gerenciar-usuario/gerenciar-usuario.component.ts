import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ConstantesGeral } from 'src/app/shared/constantes-geral';

@Component({
  selector: 'app-gerenciar-usuario',
  templateUrl: './gerenciar-usuario.component.html',
  styleUrls: ['./gerenciar-usuario.component.scss']
})
// Declara a classe do componente
export class GerenciarUsuarioComponent implements OnInit {

  // Define as colunas que serão exibidas na tabela
  displayedColumns: string[] = ['nome', 'email', 'numeroContato', 'status'];
  // Declara o dataSource que vai alimentar a tabela
  dataSource: any;
  // Variável para armazenar mensagens de resposta
  respostaMensagem: any;

  // Construtor do componente com as dependências
  constructor(
    private ngxUiLoaderService: NgxUiLoaderService,
    private usuarioService: UsuarioService,
    private snackbarService: SnackbarService,
  ) { }

  // Método chamado ao inicializar o componente
  ngOnInit(): void {
    // Inicia o loader/spinner
    this.ngxUiLoaderService.start();
    // Chama o método para carregar os dados na tabela
    this.carregarTabela();
  }

  // Método para carregar os dados na tabela
  carregarTabela() {
    // Faz a chamada ao serviço para obter todos os usuários
    this.usuarioService.findAllUsuario().subscribe((resp: any) => {
      // Para o loader/spinner
      this.ngxUiLoaderService.stop();
      // Preenche o dataSource com a resposta do servidor
      this.dataSource = new MatTableDataSource(resp);
    }, (error: any) => {
      // Para o loader/spinner caso haja um erro
      this.ngxUiLoaderService.stop();
      // Loga o erro no console
      console.log(error);
      // Configura a mensagem de erro com base na resposta do servidor ou mensagem genérica
      this.respostaMensagem = error.error?.message || ConstantesGeral.erroGenerico;
      // Mostra a mensagem de erro usando o serviço de Snackbar
      this.snackbarService.openSnackBar(this.respostaMensagem, ConstantesGeral.error)
    })
  }

  // Método para aplicar um filtro na tabela
  aplicarFiltro(event: Event) {
    // Obtém o valor do filtro a partir do evento
    const valorFiltro = (event.target as HTMLInputElement).value;
    // Aplica o filtro aos dados da tabela
    this.dataSource.filter = valorFiltro.trim().toLowerCase();
  }

  // Método para atualizar o status de um usuário
  onAtivaDesativa(status: any, id: any) {
    // Inicia o loader/spinner
    this.ngxUiLoaderService.start();
    // Prepara os dados para a atualização
    var dados = {
      status: status.toString(),
      id: id
    }

    // Faz a chamada ao serviço para atualizar o usuário
    this.usuarioService.update(dados).subscribe((resp: any) => {
      // Para o loader/spinner
      this.ngxUiLoaderService.stop();
      // Recarrega os dados na tabela
      this.carregarTabela();
      // Obtém a mensagem da resposta do servidor
      this.respostaMensagem = resp?.mensagem;
      // Mostra a mensagem de sucesso usando o serviço de Snackbar
      this.snackbarService.openSnackBar(this.respostaMensagem, ConstantesGeral.success);
    }, (error: any) => {
      // Para o loader/spinner caso haja um erro
      this.ngxUiLoaderService.stop();
      // Configura a mensagem de erro
      this.respostaMensagem = error.error?.message || ConstantesGeral.erroGenerico;
      // Mostra a mensagem de erro usando o serviço de Snackbar
      this.snackbarService.openSnackBar(this.respostaMensagem, ConstantesGeral.error);
    })
  }
}
