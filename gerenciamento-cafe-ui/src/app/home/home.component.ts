import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { LoginComponent } from '../login/login.component';
import { UsuarioService } from '../services/usuario.service';
import { SignupComponent } from '../signup/signup.component';
import { error } from 'console';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // MatDialog, usada para abrir diálogos
  constructor(private dialog: MatDialog, private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit(): void {
    this.usuarioService.checkToken().subscribe((resp: any) => {
      console.log("token checadoooooo", resp)
      this.router.navigate(['/cafe/dashboard'])
    }, (error: any) => {
      console.log('erro no token', error);
    })
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
