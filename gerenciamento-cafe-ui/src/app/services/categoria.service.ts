import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private url = `${environment.apiUrl}/categoria`; // Centralize a URL base

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' }); // Defina os headers

  constructor(private httpClient: HttpClient) { }

  addNewCategoria(dados: any) {
    return this.httpClient.post(`${this.url}/add`, dados, { headers: this.headers });
  }

  updateCategoria(dados: any) {
    return this.httpClient.post(`${this.url}/update`, dados, { headers: this.headers });
  }

  getAllCategoria() {
    return this.httpClient.get(`${this.url}/get`);
  }

  // Método 'getFilterCategoria' que não aceita parâmetros.
  // Este método faz uma requisição GET para a URL '/get' com um parâmetro de query 'filterValue=true'
  // para obter categorias que atendam a um determinado filtro.
  getFilterCategoria() {
    return this.httpClient.get(`${this.url}/get?filterValue=true`);
  }
}
