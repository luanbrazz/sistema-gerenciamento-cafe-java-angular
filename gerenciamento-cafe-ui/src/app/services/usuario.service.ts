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

  forgotPassword(dados: any) {
    return this.httpClient.post(this.url + "/usuario/forgotPassword", dados, { headers: new HttpHeaders().set('Content-Type', 'application/json') })
  }

  login(dados: any) {
    return this.httpClient.post(this.url + "/usuario/login", dados, { headers: new HttpHeaders().set('Content-Type', 'application/json') })
  }
  // Função para verificar o token de autorização do usuário
  // A função utiliza o método GET do HttpClient para enviar uma requisição para a rota de verificação do token no servidor
  checkToken() {
    return this.httpClient.get(this.url + "/usuario/checkToken")
  }

  changePassword(dados: any) {
    return this.httpClient.post(this.url + "/usuario/changePassword", dados, { headers: new HttpHeaders().set('Content-Type', 'application/json') })
  }

  findAllUsuario() {
    return this.httpClient.get(this.url + "/usuario/get")
  }

  update(dados: any) {
    return this.httpClient.post(this.url + "/usuario/update", dados, { headers: new HttpHeaders().set('Content-Type', 'application/json') })
  }
}
