import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  url = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  // Os cabeçalhos da requisição são definidos na terceira opção do método post, onde é criado um novo objeto HttpHeaders com o cabeçalho Content-Type
  // definido como application/json. Isso indica que o corpo da requisição está em formato JSON.
  signup(dados: any) {
    return this.httpClient.post(this.url + "/usuario/signup", dados, { headers: new HttpHeaders().set('Content-Type', 'application/json') })
  }
}
