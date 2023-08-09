import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';

import { SnackbarService } from '../services/snackbar.service';
import { UsuarioService } from '../services/usuario.service';
import { ConstantesGeral } from '../shared/constantes-geral';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm: any;
  respostaMensagem: any;

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private dialogRef: MatDialogRef<ForgotPasswordComponent>,
    private snackbarService: SnackbarService,
    private ngxUiLoaderService: NgxUiLoaderService
  ) { }

  ngOnInit(): void {
    this.forgotPasswordForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(ConstantesGeral.emailRegex)]],
    })
  }

  submit() {
    this.ngxUiLoaderService.start();
    var formData = this.forgotPasswordForm.value;
    var dados = {
      email: formData.email
    }
    this.usuarioService.forgotPassword(dados).subscribe((resp: any) => {
      this.ngxUiLoaderService.stop();
      this.respostaMensagem = resp?.mensagem;
      this.dialogRef.close();
      this.snackbarService.openSnackBar(this.respostaMensagem, "");
      console.log("Dados enviados para recuperação de senha", dados);
    }, (error) => {
      this.ngxUiLoaderService.stop();
      if (error.error?.mensagem) {
        this.respostaMensagem = error.error?.mensagem;
      } else {
        this.respostaMensagem = ConstantesGeral.erroGenerico;
      }
      this.snackbarService.openSnackBar(this.respostaMensagem, ConstantesGeral.error)
      console.log("Ocorreu  um erro!", dados);
    })
  }

  exibirErro(formControlName: string): boolean {
    const formControl = this.forgotPasswordForm.get(formControlName);
    return formControl?.invalid && (formControl.dirty || formControl.touched);
  }

  getErrorMessage(formControlName: string): string {
    const formControl = this.forgotPasswordForm.get(formControlName);

    if (formControl?.hasError('required')) {
      return 'O campo e-mail é requerido';
    }

    if (formControl?.hasError('pattern')) {
      return 'O campo está e-mail inválido';
    }

    return '';
  }

}
