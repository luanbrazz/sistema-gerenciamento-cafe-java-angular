import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-view-compra-produtos',
  templateUrl: './view-compra-produtos.component.html',
  styleUrls: ['./view-compra-produtos.component.scss']
})
export class ViewCompraProdutosComponent implements OnInit {

  // Definição das colunas a serem exibidas na tabela.
  displayedColumns: string[] = ['nome', 'categoria', 'preco', 'quantidade', 'total'];

  // Fonte de dados da tabela.
  dataSource: any;

  // Dados da compra.
  dados: any;

  // Construtor do componente, injetando os dados do diálogo e a referência do MatDialog.
  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any, // Injeta os dados passados para o diálogo
    public matDialogRef: MatDialogRef<ViewCompraProdutosComponent>
  ) { }

  // Método executado durante a inicialização do componente.
  ngOnInit(): void {
    this.dados = this.dialogData.data;

    // Verificação se a propriedade detalheProduto está definida nos dados do diálogo.
    if (this.dialogData.data.detalheProduto) {
      try {
        this.dataSource = JSON.parse(this.dialogData.data.detalheProduto); // Tenta analisar o JSON.
      } catch (error) {
        console.error('Erro ao fazer parse do JSON:', error);
      }
    } else {
      console.warn('A propriedade detalheProduto está vazia ou indefinida.');
    }

    console.log('Dados da compra', this.dados);
  }

  // Método para formatar o preço para o padrão brasileiro.
  formatPrice(price: number): string {
    return `R$ ${price.toFixed(2)}`; // `toFixed(2)` garante que sempre teremos duas casas decimais.
  }

}
