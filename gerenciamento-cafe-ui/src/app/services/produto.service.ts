import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private url = `${environment.apiUrl}/produto`; // Centralize a URL base

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' }); // Defina os headers

  constructor(private httpClient: HttpClient) { }

  addNewProdruto(dados: any) {
    return this.httpClient.post(`${this.url}/add`, dados, { headers: this.headers });
  }

  getAllProduto() {
    return this.httpClient.get(`${this.url}/get`);
  }

  updateProdruto(dados: any) {
    return this.httpClient.post(`${this.url}/update`, dados, { headers: this.headers });
  }

  updateStatus(dados: any) {
    return this.httpClient.post(`${this.url}/updateStatus`, dados, { headers: this.headers });
  }

  deleteProduto(id: any) {
    return this.httpClient.post(`${this.url}/delete/` + id, { headers: this.headers });
  }

  //ordenação
  getByCategoria(id: number) {
    return this.httpClient.get(`${this.url}/getByCategoria/` + id);
  }

  //ordenação
  getProdutoById(id: number) {
    return this.httpClient.get(`${this.url}/getById/` + id);
  }

}
