import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AlterarSenhaComponent } from 'src/app/material-component/dialog/alterar-senha/alterar-senha.component';
import { ConfirmacaoComponent } from 'src/app/material-component/dialog/confirmacao/confirmacao.component';

@Component({
  selector: 'app-header', // Seletor CSS para identificar o componente no template
  templateUrl: './header.component.html', // URL do template HTML associado ao componente
  styleUrls: [] // Array de URLs de arquivos de estilo associados ao componente
})
export class AppHeaderComponent {
  role: any; // Declaração de uma propriedade chamada 'role'

  // Construtor do componente, injetando o serviço Router e MatDialog
  constructor(
    private router: Router, // Injeção do serviço de roteamento
    private matDialog: MatDialog // Injeção do serviço de diálogo
  ) {
  }

  // Método para lidar com o logout do usuário
  logout() {
    const dialogConfig = new MatDialogConfig(); // Criação de uma configuração para o diálogo
    dialogConfig.data = {
      mensagem: 'Sair', // Dados que serão passados para o diálogo (mensagem e confirmação)
      confirmacao: true
    };
    const dialogRef = this.matDialog.open(ConfirmacaoComponent, dialogConfig); // Abre o diálogo de confirmação
    const sub = dialogRef.componentInstance.onEmitStatusChange.subscribe((resp: any) => {
      dialogRef.close(); // Fecha o diálogo quando o evento é emitido pelo ConfirmacaoComponent
      localStorage.clear(); // Limpa o armazenamento local (logout do usuário)
      this.router.navigate(['/']); // Navega para a rota inicial
    });
  }

  // Método para lidar com a ação de trocar a senha
  trocarSenha() {
    const dialogConfig = new MatDialogConfig(); // Criação de uma configuração para o diálogo
    dialogConfig.width = "550px"; // Configura a largura do diálogo de alteração de senha
    this.matDialog.open(AlterarSenhaComponent, dialogConfig); // Abre o diálogo de alteração de senha
  }
}
