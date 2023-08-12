// Importando os módulos e classes necessários do Angular
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

// Definindo a classe do interceptor e marcando-a como injetável
@Injectable()
export class TokenInterceptorInterceptor implements HttpInterceptor {

  // Inicializando o construtor com uma instância do Router
  constructor(
    private router: Router
  ) { }

  // Implementação do método 'intercept' conforme a interface HttpInterceptor
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    // Obtendo o token do armazenamento local (localStorage)
    const token = localStorage.getItem('token');

    // Verificando se o token existe
    if (token) {
      // Clonando o pedido (request) e adicionando um cabeçalho de autorização com o token
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
    }

    // Enviando o pedido (request) clonado para a próxima etapa do pipeline e tratando erros
    return next.handle(request).pipe(
      catchError((err) => {
        console.log("error", err);
        // Verificando se o erro é uma instância de HttpErrorResponse
        if (err instanceof HttpErrorResponse) {
          console.log(err.url);
          // Verificando se o status do erro é 401 (Não autorizado) ou 403 (Proibido)
          if (err.status === 401 || err.status === 403) {
            // Verificando se a URL atual é a página de entrada
            if (this.router.url === '/') {
              // Nada acontece se estivermos na página de entrada
            } else {
              // Limpando o armazenamento local e redirecionando para a página de entrada
              localStorage.clear();
              this.router.navigate(['']);
            }
          }
        }
        // Lançando o erro novamente para que ele possa ser tratado em outros lugares
        return throwError(err);
      })
    );
  }
}
