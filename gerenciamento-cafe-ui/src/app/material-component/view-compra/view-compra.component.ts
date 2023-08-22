import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { error } from 'console';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CompraService } from 'src/app/services/compra.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { ConstantesGeral } from 'src/app/shared/constantes-geral';
import { ViewCompraProdutosComponent } from '../dialog/view-compra-produtos/view-compra-produtos.component';
import { ConfirmacaoComponent } from '../dialog/confirmacao/confirmacao.component';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-view-compra',
  templateUrl: './view-compra.component.html',
  styleUrls: ['./view-compra.component.scss'],
})
export class ViewCompraComponent implements OnInit {

  displayedColumns: string[] = ['nome', 'email', 'numeroContato', 'pagamento', 'total', 'view'];

  dataSource: any;

  respostaMensagem: any;

  constructor(
    private compraService: CompraService,
    private ngxUiLoaderService: NgxUiLoaderService,
    private matDialog: MatDialog,
    private snackbarService: SnackbarService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.ngxUiLoaderService.start();
    this.carregarTabela();
  }
  carregarTabela() {
    this.compraService.getCompra().subscribe((resp: any) => {
      this.ngxUiLoaderService.stop();
      this.dataSource = new MatTableDataSource(resp);
    }, (error: any) => {
      this.ngxUiLoaderService.stop();
      console.log(error);
      if (error.error?.message) {
        this.respostaMensagem = error.error?.message;
      } else {
        this.respostaMensagem = ConstantesGeral.erroTabela;
      }
      this.snackbarService.openSnackBar(this.respostaMensagem, ConstantesGeral.error)
    })
  }

  aplicarFiltro(event: Event) {
    const valorFiltro = (event.target as HTMLInputElement).value; // Pega o valor inserido no input.
    this.dataSource.filter = valorFiltro.trim().toLowerCase(); // Aplica o filtro aos dados da tabela.
  }

  // Método que é acionado quando a ação de visualização é executada
  handleViewAction(valor: any) {
    // Cria uma instância da configuração do MatDialog
    const matDialogConfig = new MatDialogConfig();

    // Define os dados a serem passados para o diálogo de visualização
    matDialogConfig.data = {
      data: valor
    };

    // Define a largura do diálogo como 100%
    matDialogConfig.width = "100%";

    // Abre o diálogo de visualização (ViewCompraProdutosComponent) com a configuração definida
    const dialogRef = this.matDialog.open(ViewCompraProdutosComponent, matDialogConfig);

    // Inscreve-se nos eventos de roteamento (navegação)
    this.router.events.subscribe(() => {
      // Fecha o diálogo quando ocorre um evento de roteamento
      dialogRef.close();
    });
  }

  handleDelete(valor: any) {
    const matDialogConfig = new MatDialogConfig();
    matDialogConfig.data = {
      mensagem: 'deletar o relatório de venda do(a) ' + valor.nome,
      confirmation: true
    };

    const dialogRef = this.matDialog.open(ConfirmacaoComponent, matDialogConfig)
    const sub = dialogRef.componentInstance.onEmitStatusChange.subscribe((response) => {
      this.ngxUiLoaderService.start();
      this.deletarCompra(valor.id);
      dialogRef.close();
    })
  }

  deletarCompra(id: any) {
    this.compraService.deleteCompra(id).subscribe((resp: any) => {
      this.ngxUiLoaderService.stop();
      this.carregarTabela();
      this.respostaMensagem = resp?.mensagem;
      this.snackbarService.openSnackBar(this.respostaMensagem, ConstantesGeral.success)
    }, (error: any) => {
      console.log('Erro ao excluir');
      this.ngxUiLoaderService.stop();
      console.log(error);
      if (error.error?.message) {
        this.respostaMensagem = error.error?.message;
      } else {
        this.respostaMensagem = ConstantesGeral.erroTabela;
      }
      this.snackbarService.openSnackBar(this.respostaMensagem, ConstantesGeral.error)
    })
  }

  downloadRelatorioAction(valores: any) {
    this.ngxUiLoaderService.start();
    var dados = {
      nome: valores.nome,
      email: valores.email,
      uuid: valores.uuid,
      numeroContato: valores.numeroContato,
      pagamento: valores.pagamento,
      totalCompra: valores.totalCompra.toString,
      detalheProduto: valores.detalheProduto,
    }

    this.downloadFile(valores.uuid, dados);
  }

  downloadFile(nomeArquivo: any, dados: any) {
    this.ngxUiLoaderService.stop();
    this.compraService.getPdf(dados).subscribe((response) => {
      saveAs(response, nomeArquivo + '.pdf')
    })
  }

  // Método para formatar o preço para o padrão brasileiro.
  formatPrice(price: number): string {
    return `R$ ${price.toFixed(2)}`; // `toFixed(2)` garante que sempre teremos duas casas decimais.
  }

  formatPhoneNumber(phoneNumber: string): string {
    if (phoneNumber && phoneNumber.length === 11) {
      const ddd = phoneNumber.substr(0, 2);
      const firstPart = phoneNumber.substr(2, 5);
      const secondPart = phoneNumber.substr(7);
      return `(${ddd}) ${firstPart}-${secondPart}`;
    }
    return phoneNumber; // Retorna o número original se não estiver no formato esperado
  }

}
