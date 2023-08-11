import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';

import { SnackbarService } from '../services/snackbar.service';
import { UsuarioService } from '../services/usuario.service';
import { ConstantesGeral } from '../shared/constantes-geral';
import { Router } from '@angular/router';
import { error } from 'console';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  //hide
  esconder = true;
  loginForm: any = FormGroup
  respostaMensagem: any;

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private dialogRef: MatDialogRef<LoginComponent>,
    private snackbarService: SnackbarService,
    private router: Router,
    private ngxUiLoaderService: NgxUiLoaderService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(ConstantesGeral.emailRegex)]],
      senha: [null, [Validators.required]]
    });
  }

  submit() {
    this.ngxUiLoaderService.start();
    var formData = this.loginForm.value;
    var dados = {
      email: formData.email,
      senha: formData.senha
    }
    this.usuarioService.login(dados).subscribe((resp: any) => {
      this.ngxUiLoaderService.stop();
      this.dialogRef.close();
      localStorage.setItem('token', resp.token);
      this.router.navigate(['/cafe/dashboard'])
    }, (error) => {
      this.ngxUiLoaderService.stop();
      console.log("Erro ao fazer o login", error);
      if (error.error?.message) {
        this.respostaMensagem = error.error?.message;
      } else {
        this.respostaMensagem = ConstantesGeral.erroGenerico;
      }
      this.snackbarService.openSnackBar(this.respostaMensagem, ConstantesGeral.error);
    })
  }

  exibirErro(formControlName: string): boolean {
    const formControl = this.loginForm.get(formControlName);
    return formControl?.invalid && (formControl.dirty || formControl.touched);
  }

  getErrorMessage(formControlName: string): string {
    const formControl = this.loginForm.get(formControlName);

    if (formControl?.hasError('required')) {
      return "O campo " + formControlName + " é requerido";
    }

    if (formControl?.hasError('pattern')) {
      return 'O campo está ' + formControlName + ' inválido';
    }

    return '';
  }

}
