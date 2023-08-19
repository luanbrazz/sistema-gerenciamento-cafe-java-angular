// Importando as dependências necessárias
import { Component, EventEmitter, Inject, OnInit } from '@angular/core'; // Importando os decorators e classes do Angular
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Importando classes para lidar com formulários reativos
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'; // Importando classes do Angular Material para lidar com diálogos
import { SnackbarService } from 'src/app/services/snackbar.service'; // Importando o serviço de Snackbars
import { ConstantesGeral } from 'src/app/shared/constantes-geral'; // Importando constantes da aplicação

import { CategoriaService } from './../../../services/categoria.service'; // Importando o serviço de Categoria

// Decorator para definir que esta classe é um Componente do Angular
@Component({
  selector: 'app-categoria', // Selector para usar este componente em templates HTML
  templateUrl: './categoria.component.html', // Caminho para o arquivo HTML que define a view deste componente
  styleUrls: ['./categoria.component.scss'] // Caminho para o arquivo CSS que define os estilos deste componente
})
export class CategoriaComponent implements OnInit { // Implementa a interface OnInit para usar o método ngOnInit()

  onAdicionarCategoria = new EventEmitter(); // Emite um evento quando uma categoria é adicionada

  onEditarCategoria = new EventEmitter(); // Emite um evento quando uma categoria é editada

  categoriaForm: any = FormGroup; // Define uma propriedade para o formulário de categorias

  dialogAction: any = "Adicionar"; // Define uma propriedade para a ação do diálogo

  action: any = "Adicionar" // Define a ação que será usada no botão do formulário

  respostaMensagem: any; // Define uma propriedade para armazenar a mensagem de resposta do servidor

  // Construtor do componente, onde as dependências são injetadas
  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any, // Injeta os dados passados para o diálogo
    private formBuilder: FormBuilder, // Injeta o FormBuilder para criar formulários reativos
    private categoriaService: CategoriaService, // Injeta o serviço de Categoria
    private matDialogRef: MatDialogRef<CategoriaComponent>, // Injeta uma referência ao diálogo atual
    private snackbarService: SnackbarService, // Injeta o serviço de Snackbars
  ) { }

  // Método que é chamado quando o componente é inicializado
  ngOnInit(): void {
    // Inicializa o formulário de categoria com um campo 'nome' que é obrigatório
    this.categoriaForm = this.formBuilder.group({
      nome: [null, [Validators.required]]
    });

    // Verifica se a ação passada para o diálogo é 'Editar'
    if (this.dialogData.action === 'Editar') {
      this.dialogAction = "Editar";
      this.action = "Atualizar";
      // Preenche o formulário com os dados da categoria que está sendo editada
      this.categoriaForm.patchValue(this.dialogData.data);
    }
  }

  // Método que é chamado quando o formulário é submetido
  submit() {
    // Verifica qual ação deve ser realizada com base na propriedade 'dialogAction'
    if (this.dialogAction === "Editar") {
      this.editar(); // Se a ação é 'Editar', chama o método 'editar'
    } else {
      this.adicionar(); // Caso contrário, chama o método 'adicionar'
    }
  }

  // Método para adicionar uma nova categoria
  adicionar() {
    var formData = this.categoriaForm.value; // Obtém os dados do formulário
    var dados = {
      nome: formData.nome // Monta o objeto 'dados' com os valores do formulário
    }

    // Chama o método 'addNewCategoria' do serviço 'CategoriaService'
    this.categoriaService.addNewCategoria(dados).subscribe((resp: any) => {
      this.matDialogRef.close(); // Fecha o diálogo
      this.onAdicionarCategoria.emit(); // Emite o evento de categoria adicionada
      this.respostaMensagem = resp.mensagem; // Armazena a mensagem de resposta do servidor
      // Abre um Snackbar com a mensagem de sucesso
      this.snackbarService.openSnackBar(this.respostaMensagem, ConstantesGeral.success);
    }, (error) => { // Trata os erros que podem ocorrer durante a requisição
      console.log("Erro ao cadastrar", error); // Imprime o erro no console
      this.matDialogRef.close(); // Fecha o diálogo em caso de erro

      // Verifica se a resposta de erro contém uma mensagem e a utiliza, caso contrário usa uma mensagem genérica
      if (error.error?.message) {
        this.respostaMensagem = error.error?.message;
      } else {
        this.respostaMensagem = ConstantesGeral.erroGenerico;
      }
      // Abre um Snackbar com a mensagem de erro
      this.snackbarService.openSnackBar(this.respostaMensagem, ConstantesGeral.error);
    })
  }

  // Método para editar uma categoria existente
  editar() {
    var formData = this.categoriaForm.value; // Obtém os dados do formulário
    var dados = {
      id: this.dialogData.data.id, // Obtém o ID da categoria que está sendo editada
      nome: formData.nome // Monta o objeto 'dados' com os valores do formulário
    }

    // Chama o método 'updateCategoria' do serviço 'CategoriaService'
    this.categoriaService.updateCategoria(dados).subscribe((resp: any) => {
      this.matDialogRef.close(); // Fecha o diálogo
      this.onAdicionarCategoria.emit(); // Emite o evento de categoria editada
      this.respostaMensagem = resp.mensagem; // Armazena a mensagem de resposta do servidor
      // Abre um Snackbar com a mensagem de sucesso
      this.snackbarService.openSnackBar(this.respostaMensagem, ConstantesGeral.success);
    }, (error) => { // Trata os erros que podem ocorrer durante a requisição
      console.log("Erro ao cadastrar", error); // Imprime o erro no console
      this.matDialogRef.close(); // Fecha o diálogo em caso de erro

      // Verifica se a resposta de erro contém uma mensagem e a utiliza, caso contrário usa uma mensagem genérica
      if (error.error?.message) {
        this.respostaMensagem = error.error?.message;
      } else {
        this.respostaMensagem = ConstantesGeral.erroGenerico;
      }
      // Abre um Snackbar com a mensagem de erro
      this.snackbarService.openSnackBar(this.respostaMensagem, ConstantesGeral.error);
    })
  }
}
