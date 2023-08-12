import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { SnackbarService } from './snackbar.service';
import { ConstantesGeral } from '../shared/constantes-geral';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService {

  constructor(
    public authService: AuthService,
    public router: Router,
    private snackbarService: SnackbarService,
  ) { }

  // Método que determina se uma rota pode ser ativada
  canActivate(route: ActivatedRouteSnapshot): boolean {
    // Obtém as "roles" esperadas para essa rota a partir dos dados da rota
    let expectedRoleArray = route.data;
    expectedRoleArray = expectedRoleArray.expectedRole;

    // Busca o token JWT do usuário no armazenamento local
    const token: any = localStorage.getItem('token');

    var tokenPayload: any;

    // Tenta decodificar o token manualmente
    try {
      // Divide o token em cabeçalho e carga útil, e decodifica a carga útil
      const [headerBase64, payloadBase64] = token.split('.');
      const payload = JSON.parse(atob(payloadBase64));
      tokenPayload = payload;
    } catch (error) {
      // Se a decodificação falhar, limpa o armazenamento local e redireciona para a página inicial
      localStorage.clear();
      this.router.navigate(['/']);
    }

    // Percorre as "roles" esperadas e verifica se a role do usuário corresponde a alguma delas
    let expectedRole = '';
    for (let i = 0; i < expectedRoleArray.length; i++) {
      if (expectedRoleArray[i] == tokenPayload.role) {
        expectedRole = tokenPayload.role;
      }
    }

    // Verifica a role do token decodificado
    if (tokenPayload.role === 'usuario' || tokenPayload.role === 'admin') {
      // Se o usuário estiver autenticado e tiver a role esperada, permite o acesso
      if (this.authService.isAuthenticated() && tokenPayload.role === expectedRole) {
        return true;
      }
      // Caso contrário, mostra uma mensagem de erro e redireciona para o dashboard do café
      this.snackbarService.openSnackBar(ConstantesGeral.naoAutorizado, ConstantesGeral.error);
      this.router.navigate(['/cafe/dashboard']);
      return false;
    }
    // Se a role do token não for 'usuario', redireciona para a página inicial e limpa o armazenamento local
    else {
      this.router.navigate(['/']);
      localStorage.clear();
      return false;
    }
  }
}
