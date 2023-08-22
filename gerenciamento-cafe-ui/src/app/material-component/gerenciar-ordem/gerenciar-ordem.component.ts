import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { error } from 'console';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CategoriaService } from 'src/app/services/categoria.service';
import { CompraService } from 'src/app/services/compra.service';
import { ProdutoService } from 'src/app/services/produto.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { ConstantesGeral } from 'src/app/shared/constantes-geral';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-gerenciar-ordem',
  templateUrl: './gerenciar-ordem.component.html',
  styleUrls: ['./gerenciar-ordem.component.scss'],
})
export class GerenciarOrdemComponent implements OnInit {
  displayedColumns: string[] = [
    'nome',
    'categoria',
    'preco',
    'quantidade',
    'total',
    'editar',
  ];

  dataSource: any = [];

  gerenciarOrdemForm: any = FormGroup;

  categorias: any = [];

  produtos: any = [];

  preco: any;

  totalCompra: number = 0;

  respostaMensagem: any;

  metodosPagamento: string[] = [
    'Dinheiro',
    'Pix',
    'Cartão de Crédito',
    'Cartão de Débito',
    'Boleto Bancário',
  ];

  fieldLabels: { [key: string]: string } = {
    nome: 'Nome',
    email: 'E-mail',
    preco: 'Preço',
    numeroContato: 'Celular/Telefone',
    pagamento: 'Método de Pagamento',
    quantidade: 'Quantidade',
    total: 'Total',
  };

  constructor(
    private formBuilder: FormBuilder,
    private categoriaService: CategoriaService,
    private produtoService: ProdutoService,
    private snackbarService: SnackbarService,
    private compraService: CompraService,
    private ngxUiLoaderService: NgxUiLoaderService
  ) { }

  ngOnInit(): void {
    this.ngxUiLoaderService.start();
    this.getCategorias();
    this.gerenciarOrdemForm = this.formBuilder.group({
      nome: [
        null,
        [Validators.required, Validators.pattern(ConstantesGeral.nomeRegex)],
      ],
      email: [
        null,
        [Validators.required, Validators.pattern(ConstantesGeral.emailRegex)],
      ],
      numeroContato: [
        null,
        [
          Validators.required,
          Validators.pattern(ConstantesGeral.numeroContatoRegex),
        ],
      ],
      pagamento: [null, Validators.required],
      produto: [null, Validators.required],
      categoria: [null, Validators.required],
      quantidade: [null, Validators.required],
      preco: [null, Validators.required],
      total: [null, Validators.required],
    });
  }

  getCategorias() {
    this.categoriaService.getFilterCategoria().subscribe(
      (resp: any) => {
        this.ngxUiLoaderService.stop();
        this.categorias = resp;
      },
      (error: any) => {
        console.log(error);
        this.ngxUiLoaderService.stop();
        if (error.error?.message) {
          this.respostaMensagem = error.error?.message;
        } else {
          this.respostaMensagem = ConstantesGeral.erroGenerico;
        }
        this.snackbarService.openSnackBar(
          this.respostaMensagem,
          ConstantesGeral.error
        );
      }
    );
  }

  getProdutobyCategoria(valor: any) {
    this.produtoService.getByCategoria(valor.id).subscribe(
      (resp: any) => {
        this.produtos = resp;
        this.gerenciarOrdemForm.controls['preco'].setValue('');
        this.gerenciarOrdemForm.controls['quantidade'].setValue('');
        this.gerenciarOrdemForm.controls['total'].setValue(0);
      },
      (error: any) => {
        console.log('Erro ao buscar os produtos', error);
        if (error.error?.message) {
          this.respostaMensagem = error.error?.message;
        } else {
          this.respostaMensagem = ConstantesGeral.erroGenerico;
        }
        this.snackbarService.openSnackBar(
          this.respostaMensagem,
          ConstantesGeral.error
        );
      }
    );
  }

  getProdutoDetalhes(valor: any) {
    this.produtoService.getProdutoById(valor.id).subscribe(
      (resp: any) => {
        this.preco = resp.preco;
        this.gerenciarOrdemForm.controls['preco'].setValue(resp.preco);
        this.gerenciarOrdemForm.controls['quantidade'].setValue('1');
        this.gerenciarOrdemForm.controls['total'].setValue(this.preco * 1);
      },
      (error: any) => {
        if (error.error?.message) {
          this.respostaMensagem = error.error?.message;
        } else {
          this.respostaMensagem = ConstantesGeral.erroGenerico;
        }
        this.snackbarService.openSnackBar(
          this.respostaMensagem,
          ConstantesGeral.error
        );
      }
    );
  }

  setQuantidade(valor: any) {
    var qtd = this.gerenciarOrdemForm.controls['quantidade'].value;
    if (qtd > 0) {
      this.gerenciarOrdemForm.controls['total'].setValue(
        this.gerenciarOrdemForm.controls['quantidade'].value *
        this.gerenciarOrdemForm.controls['preco'].value
      );
    } else if (qtd != '') {
      this.gerenciarOrdemForm.controls['quantidade'].setValue(1);
      this.gerenciarOrdemForm.controls['total'].setValue(
        this.gerenciarOrdemForm.controls['quantidade'].value *
        this.gerenciarOrdemForm.controls['preco'].value
      );
    }
  }

  validarAddProduto() {
    if (
      this.gerenciarOrdemForm.controls['total'].value === 0 ||
      this.gerenciarOrdemForm.controls['total'].value === null ||
      this.gerenciarOrdemForm.controls['quantidade'].value <= 0
    ) {
      return true;
    } else {
      return false;
    }
  }

  validarSubmit() {
    if (
      this.totalCompra === 0 ||
      this.gerenciarOrdemForm.controls['nome'].value === null ||
      this.gerenciarOrdemForm.controls['email'].value === null ||
      this.gerenciarOrdemForm.controls['numeroContato'].value === null ||
      this.gerenciarOrdemForm.controls['pagamento'].value === null
    ) {
      return true;
    } else {
      return false;
    }
  }

  Adicionar() {
    var formData = this.gerenciarOrdemForm.value;
    var nomeProduto = this.dataSource.find(
      (e: { id: number }) => e.id === formData.produto.id
    );

    if (nomeProduto === undefined) {
      this.totalCompra = this.totalCompra + formData.total;
      this.dataSource.push({
        id: formData.produto.id,
        nome: formData.produto.nome,
        categoria: formData.categoria.nome,
        quantidade: formData.quantidade,
        preco: formData.preco,
        total: formData.total,
      });

      this.dataSource = [...this.dataSource];
      this.snackbarService.openSnackBar(
        ConstantesGeral.produtoAdicionadoSucesso,
        ConstantesGeral.success
      );
    } else {
      this.snackbarService.openSnackBar(
        ConstantesGeral.produtoJaexisteError,
        ConstantesGeral.error
      );
    }
  }

  handleDeleteAction(valor: any, element: any) {
    this.totalCompra = this.totalCompra - element.total;
    this.dataSource.splice(valor, 1);
    this.dataSource = [...this.dataSource];
  }

  submitAction() {
    var formData = this.gerenciarOrdemForm.value;
    var dados = {
      nome: formData.nome,
      email: formData.email,
      numeroContato: formData.numeroContato,
      pagamento: formData.pagamento,
      totalCompra: this.totalCompra.toString(),
      detalheProduto: JSON.stringify(this.dataSource),
    };

    this.ngxUiLoaderService.start();

    this.compraService.gerarRelatorio(dados).subscribe(
      (resp: any) => {
        this.downloadArquivo(resp?.uuid);
        this.gerenciarOrdemForm.reset();
        this.dataSource = [];
        this.totalCompra = 0;
      },
      (error: any) => {
        this.ngxUiLoaderService.stop();
        console.log(error);
        if (error.error?.message) {
          this.respostaMensagem = error.error?.message;
        } else {
          this.respostaMensagem = ConstantesGeral.erroGenerico;
        }
        this.snackbarService.openSnackBar(
          this.respostaMensagem,
          ConstantesGeral.error
        );
      }
    );
  }

  // Método para baixar um arquivo PDF
  downloadArquivo(nomeArquivo: string) {
    var dados = {
      uuid: nomeArquivo,
    };

    this.compraService.getPdf(dados).subscribe((response: any) => {
      saveAs(response, nomeArquivo + '.pdf');
      // this.ngxUiLoaderService.stopBackgroundLoader('Gerando Relatório...');
      this.ngxUiLoaderService.stop();
    });
  }

  exibirErro(formControlName: string) {
    const control = this.gerenciarOrdemForm.get(formControlName);
    return control?.touched && control?.invalid;
  }

  // Método para obter a mensagem de erro apropriada para cada campo do formulário
  getErrorMessage(formControlName: string): string {
    const control = this.gerenciarOrdemForm.get(formControlName);
    const friendlyName = this.fieldLabels[formControlName] || formControlName;
    if (control?.touched && control?.invalid) {
      if (control.errors?.required) {
        return `O campo <b>${friendlyName}</b> é requerido`;
      }
      if (control.errors?.pattern) {
        return `O campo <b>${friendlyName}</b> está inválido`;
      }
    }
    return '';
  }
}
