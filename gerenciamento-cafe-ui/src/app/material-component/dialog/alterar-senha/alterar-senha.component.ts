import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { MatDialogRef } from '@angular/material/dialog';
import { error } from 'console';
import { ConstantesGeral } from 'src/app/shared/constantes-geral';

@Component({
  selector: 'app-alterar-senha',
  templateUrl: './alterar-senha.component.html',
  styleUrls: ['./alterar-senha.component.scss']
})
export class AlterarSenhaComponent implements OnInit {

  senhaAntiga = true;
  senhaNova = true;
  confirmaSenha = true;
  alterarSenhaForm: any = FormGroup;
  respostaMensagem: any;

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private ngxUiLoaderService: NgxUiLoaderService,
    private snackbarService: SnackbarService,
    public matDialogRef: MatDialogRef<AlterarSenhaComponent>
  ) { }

  ngOnInit(): void {
    this.alterarSenhaForm = this.formBuilder.group({
      senhaAntiga: [null, Validators.required],
      senhaNova: [null, Validators.required],
      confirmaSenha: [null, Validators.required],
    })
  }

  validateSubmit() {
    if (this.alterarSenhaForm.controls['senhaNova'].value != this.alterarSenhaForm.controls['confirmaSenha'].value) {
      return true;
    } else {
      return false;
    }
  }

  submit() {
    this.ngxUiLoaderService.start();
    var formDados = this.alterarSenhaForm.value;
    var dados = {
      senhaAntiga: formDados.senhaAntiga,
      senhaNova: formDados.senhaNova,
      confirmaSenha: formDados.confirmaSenha
    }

    this.usuarioService.changePassword(dados).subscribe((resp: any) => {
      this.ngxUiLoaderService.stop();
      this.respostaMensagem = resp?.mensagem;
      this.matDialogRef.close();
      this.snackbarService.openSnackBar(this.respostaMensagem, ConstantesGeral.success);
    }, (error) => {
      console.log(error);
      this.ngxUiLoaderService.stop();
      if (error.error?.message) {
        this.respostaMensagem = error.error?.message;
      } else {
        this.respostaMensagem = ConstantesGeral.erroGenerico;
      }
      this.snackbarService.openSnackBar(this.respostaMensagem, ConstantesGeral.error);
    })

  }

}
