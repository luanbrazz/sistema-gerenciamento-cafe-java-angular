import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';

import { SnackbarService } from '../services/snackbar.service';
import { UsuarioService } from '../services/usuario.service';
import { ConstantesGeral } from '../shared/constantes-geral';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  senha = true;
  confirmaSenha = true;
  signupForm: any = FormGroup;
  respostaMensagem: any;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private snackbarService: SnackbarService,
    // Essa declaração cria uma variável chamada "dialogRef" que representa uma referência para o diálogo aberto e permite interagir com ele, como fechá-lo após o envio do formulário com sucesso.
    public dialogRef: MatDialogRef<SignupComponent>,
    private ngxService: NgxUiLoaderService
  ) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.pattern(ConstantesGeral.nomeRegex)]],
      email: [null, [Validators.required, Validators.pattern(ConstantesGeral.emailRegex)]],
      numeroContato: [null, [Validators.required, Validators.pattern(ConstantesGeral.numeroContatoRegex)]],
      senha: [null, [Validators.required]],
      confirmaSenha: [null, [Validators.required]],
    })
  }

  validarCadastro() {
    if (this.signupForm.controls['senha'].value != this.signupForm.controls['confirmaSenha'].value) {
      return true
    } else {
      return false
    }
  }

  // lidarComEnvio
  handleSubmit() {
    this.ngxService.start();
    var dadosForm = this.signupForm.value;
    var dados = {
      nome: dadosForm.nome,
      email: dadosForm.email,
      numeroContato: dadosForm.numeroContato,
      senha: dadosForm.senha,
    }

    this.usuarioService.signup(dados).subscribe((resp: any) => {
      this.ngxService.stop();
      this.dialogRef.close();
      this.respostaMensagem = resp?.mensagem;
      this.snackbarService.openSnackBar(this.respostaMensagem, "");
      this.router.navigate(['/']);
    }, (error) => {
      this.ngxService.stop();
      if (error.error?.mensagem) {
        this.respostaMensagem = error.error?.mensagem;
      } else {
        this.respostaMensagem = ConstantesGeral.erroGenerico;
      }

      this.snackbarService.openSnackBar(this.respostaMensagem, ConstantesGeral.error)
    })
  }

  exibirErro(formControlName: string) {
    const control = this.signupForm.get(formControlName);
    return control?.touched && control?.invalid;
  }

  getTipoSenha() {
    return this.senha ? 'password' : 'text';
  }

  alternarTipoSenha() {
    this.senha = !this.senha;
  }

  getTipoConfirmaSenha() {
    return this.confirmaSenha ? 'password' : 'text';
  }

  alternarTipoConfirmaSenha() {
    this.confirmaSenha = !this.confirmaSenha;
  }

}
