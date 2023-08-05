import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  12: 14
  constructor(private snackBar: MatSnackBar) { }

  openSnackBar(mensagem: string, acao: string) {
    if (acao === 'error') {
      this.snackBar.open(mensagem, '', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 2000,
        panelClass: ['black-snackbar']
      })
    } else {
      this.snackBar.open(mensagem, '', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 2000,
        panelClass: ['green-snackbar']
      })
    }
  }
}
