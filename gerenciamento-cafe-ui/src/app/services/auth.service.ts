import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Inicializando o construtor com uma instância do Router
  constructor(private router: Router) { }

  // Função para verificar se o usuário está autenticado
  public isAuthenticated(): boolean {
    // Obtendo o token do armazenamento local (localStorage)
    const token = localStorage.getItem('token');

    // Verificando se o token não existe
    if (!token) {
      // Redirecionando para a página de entrada e registrando uma mensagem de não autenticado no console
      this.router.navigate(['/']);
      console.log("NÃO ESTÁ AUTENTICADO");
      return false;
    } else {
      // Registrando uma mensagem de autenticado no console e retornando verdadeiro
      console.log("ESTÁ AUTENTICADO");
      return true;
    }
  }
}
