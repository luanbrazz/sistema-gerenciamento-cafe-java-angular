import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // MatDialog, usada para abrir diálogos
  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }
  // lidar com a ação de inscrição
  // Método para lidar com a ação de inscrição, abrindo um diálogo de inscrição
  openModalInscricao() {
    // Cria uma nova configuração para o diálogo
    const dialogConfig = new MatDialogConfig();

    // Define a largura do diálogo
    dialogConfig.width = "550px";

    // Abre o diálogo usando o método 'open' de 'dialog', passando o componente a ser exibido no diálogo e as configurações do diálogo
    this.dialog.open(SignupComponent, dialogConfig)
  }

  openModalEsqueciaASenha() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "550px";
    this.dialog.open(ForgotPasswordComponent, dialogConfig)
  }

  openModalLogin() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "550px";
    this.dialog.open(LoginComponent, dialogConfig)
  }

}
