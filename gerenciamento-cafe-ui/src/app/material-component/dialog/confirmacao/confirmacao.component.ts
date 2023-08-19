import { Component, OnInit, Inject } from '@angular/core'; // Importa classes e decoradores do Angular
import { MAT_DIALOG_DATA } from '@angular/material/dialog'; // Importa o injetor de dados do diálogo
import { Subject } from 'rxjs'; // Importa o Subject da biblioteca RxJS para criação de observáveis

@Component({
  selector: 'app-confirmacao', // Seletor CSS para identificar o componente no template
  templateUrl: './confirmacao.component.html', // URL do template HTML associado ao componente
  styleUrls: ['./confirmacao.component.scss'] // Array de URLs de arquivos de estilo associados ao componente
})
export class ConfirmacaoComponent implements OnInit {

  onEmitStatusChange = new Subject<boolean>(); // Criação de um Subject para emitir eventos
  detalhes: any = {}; // Declaração de uma propriedade chamada 'detalhes'

  // Construtor do componente, injetando os dados do diálogo (MAT_DIALOG_DATA)
  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any) { }

  ngOnInit(): void {
    this.detalhes = this.dialogData || {};
  }

  // Método chamado quando a ação de mudança é acionada
  handleChangeAction() {
    this.onEmitStatusChange.next(); // Emite um evento usando o método next() do Subject
  }

}
