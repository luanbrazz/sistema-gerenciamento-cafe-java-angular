// Importação de módulos e serviços necessários
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core'; // Importa os módulos do Angular Core
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Importa módulos do Angular Forms
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'; // Importa módulos do Angular Material Dialog
import { CategoriaService } from 'src/app/services/categoria.service'; // Importa o serviço de Categoria
import { ProdutoService } from 'src/app/services/produto.service'; // Importa o serviço de Produto
import { SnackbarService } from 'src/app/services/snackbar.service'; // Importa o serviço de Snackbar
import { ConstantesGeral } from 'src/app/shared/constantes-geral'; // Importa constantes usadas em todo o aplicativo

// Decorador para definir que esta classe é um componente Angular
@Component({
  selector: 'app-produto', // Nome do componente
  templateUrl: './produto.component.html', // Caminho para o arquivo HTML do componente
  styleUrls: ['./produto.component.scss'] // Caminho para o arquivo SCSS do componente
})
export class ProdutoComponent implements OnInit {

  onAddProduto = new EventEmitter(); // Evento para notificar o componente pai quando um produto é adicionado
  onEditProduto = new EventEmitter(); // Evento para notificar o componente pai quando um produto é editado
  produtoForm: any = FormGroup; // Formulário para manipular os dados do produto
  dialogAction: any = "Adicionar" // Variável para armazenar a ação do diálogo
  action: any = "Adicionar" // Variável para armazenar a ação do formulário
  respostaMensagem: any; // Variável para armazenar a mensagem de resposta
  categorias: any = []; // Array para armazenar as categorias obtidas do serviço

  // Construtor da classe, onde os serviços e dados são injetados
  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any, // Injeta os dados passados para o diálogo
    private formBuilder: FormBuilder, // Injeta o FormBuilder para criar formulários reativos
    private produtoService: ProdutoService, // Injeta o serviço de Produto
    private matDialogRef: MatDialogRef<ProdutoComponent>, // Injeta a referência ao diálogo para poder fechá-lo
    private categoriaService: CategoriaService, // Injeta o serviço de Categoria
    private snackbarService: SnackbarService // Injeta o serviço de Snackbar para mostrar notificações
  ) { }

  // Método chamado quando o componente é inicializado
  ngOnInit(): void {
    console.log(this.dialogData); // Log dos dados passados para o diálogo no console
    // Inicializa o formulário com validações
    this.produtoForm = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.pattern(ConstantesGeral.nomeRegex)]], // Campo 'nome' do formulário
      categoriaId: [null, [Validators.required]], // Campo 'categoriaId' do formulário
      preco: [null, [Validators.required, Validators.pattern(ConstantesGeral.precoRegex)]], // Campo 'preco' do formulário
      descricao: [null, [Validators.required]] // Campo 'descricao' do formulário
    });

    // Verifica se a ação passada para o diálogo é 'Editar'
    if (this.dialogData.action === 'Editar') {
      this.dialogAction = "Editar"; // Define a ação do diálogo como 'Editar'
      this.action = "Update"; // Define a ação do formulário como 'Update'
      this.produtoForm.patchValue(this.dialogData.data); // Preenche o formulário com os dados passados para o diálogo
    }

    this.getCategoria(); // Chama o método para obter as categorias
  }

  // Método para obter as categorias através do serviço de Categoria
  getCategoria() {
    this.categoriaService.getAllCategoria().subscribe((resp: any) => { // Inicia a requisição HTTP
      this.categorias = resp; // Atribui a resposta à variável 'categorias'
    }, (error) => { // Em caso de erro
      console.log("Erro ao buscar as categorias", error); // Log do erro no console
      // Verifica se existe uma mensagem de erro na resposta e a atribui à variável 'respostaMensagem'
      if (error.error?.message) {
        this.respostaMensagem = error.error?.message;
      } else {
        this.respostaMensagem = "Ocorreu um erro inesperado ao tentar carregar lista de categoria!"; // Mensagem de erro padrão
      }
      // Exibe a mensagem de erro usando o serviço de Snackbar
      this.snackbarService.openSnackBar(this.respostaMensagem, ConstantesGeral.error);
    })
  }

  // Método chamado quando o formulário é enviado
  submit() {
    if (this.dialogAction === "Editar") { // Se a ação do diálogo for 'Editar'
      this.editar(); // Chama o método para editar o produto
    } else {
      this.adicionar(); // Caso contrário, chama o método para adicionar um novo produto
    }
  }

  // Método para adicionar um novo produto através do serviço de Produto
  adicionar() {
    var formData = this.produtoForm.value; // Obtém os dados do formulário
    var dados = { // Prepara os dados para enviar ao backend
      nome: formData.nome,
      categoriaId: formData.categoriaId,
      preco: formData.preco,
      descricao: formData.descricao,
    }

    // Inicia a requisição HTTP para adicionar um novo produto
    this.produtoService.addNewProdruto(dados).subscribe((resp: any) => { // Em caso de sucesso
      this.matDialogRef.close(); // Fecha o diálogo
      this.onAddProduto.emit(); // Emite o evento para notificar o componente pai que um produto foi adicionado
      this.respostaMensagem = resp.mensagem; // Atribui a mensagem de resposta à variável 'respostaMensagem'
      // Exibe a mensagem de sucesso usando o serviço de Snackbar
      this.snackbarService.openSnackBar(this.respostaMensagem, ConstantesGeral.success);
    }, (error) => { // Em caso de erro
      // Verifica se existe uma mensagem de erro na resposta e a atribui à variável 'respostaMensagem'
      if (error.error?.message) {
        this.respostaMensagem = error.error?.message;
      } else {
        this.respostaMensagem = ConstantesGeral.erroGenerico; // Mensagem de erro padrão
      }
      // Exibe a mensagem de erro usando o serviço de Snackbar
      this.snackbarService.openSnackBar(this.respostaMensagem, ConstantesGeral.error);
    })
  }

  // Método para editar um produto existente através do serviço de Produto
  editar() {
    var formData = this.produtoForm.value; // Obtém os dados do formulário
    var dados = { // Prepara os dados para enviar ao backend
      id: this.dialogData.data.id, // Obtém o ID do produto que está sendo editado
      nome: formData.nome,
      categoriaId: formData.categoriaId,
      preco: formData.preco,
      descricao: formData.descricao,
    }

    // Inicia a requisição HTTP para editar o produto
    this.produtoService.updateProdruto(dados).subscribe((resp: any) => { // Em caso de sucesso
      this.matDialogRef.close(); // Fecha o diálogo
      this.onEditProduto.emit(); // Emite o evento para notificar o componente pai que um produto foi editado
      this.respostaMensagem = resp.mensagem; // Atribui a mensagem de resposta à variável 'respostaMensagem'
      // Exibe a mensagem de sucesso usando o serviço de Snackbar
      this.snackbarService.openSnackBar(this.respostaMensagem, ConstantesGeral.success);
    }, (error) => { // Em caso de erro
      // Verifica se existe uma mensagem de erro na resposta e a atribui à variável 'respostaMensagem'
      if (error.error?.message) {
        this.respostaMensagem = error.error?.message;
      } else {
        this.respostaMensagem = ConstantesGeral.erroGenerico; // Mensagem de erro padrão
      }
      // Exibe a mensagem de erro usando o serviço de Snackbar
      this.snackbarService.openSnackBar(this.respostaMensagem, ConstantesGeral.error);
    })
  }

  // Método para verificar se um campo do formulário foi tocado e é inválido
  exibirErro(formControlName: string) {
    const control = this.produtoForm.get(formControlName);
    return control?.touched && control?.invalid;
  }

  // Método para permitir apenas a entrada de números no campo
  numberOnly(event: KeyboardEvent): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
}
