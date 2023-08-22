// Importa a classe Observable do pacote 'rxjs', que é usada para representar
// observáveis, os quais são coleções que chegam ao longo do tempo.
import { Observable } from 'rxjs';

// Importa as classes HttpClient e HttpHeaders do pacote '@angular/common/http',
// que são usadas para fazer solicitações HTTP e configurar os cabeçalhos HTTP, respectivamente.
import { HttpClient, HttpHeaders } from '@angular/common/http';

// Importa o decorador Injectable do pacote '@angular/core',
// que é usado para marcar uma classe como disponível para ser fornecida e injetada como dependência.
import { Injectable } from '@angular/core';

// Importa o objeto 'environment' do arquivo de ambiente,
// que é usado para acessar as variáveis de ambiente do projeto.
import { environment } from 'src/environments/environment';

// Decorador Injectable que marca a classe como um serviço que pode ser injetado em componentes e outros serviços.
@Injectable({
  providedIn: 'root',
})
export class CompraService {
  // Declara uma propriedade privada 'url' e a inicializa com a URL base do serviço de compras.
  // O valor é construído a partir de uma variável de ambiente.
  private url = `${environment.apiUrl}/compra`;

  // Declara uma propriedade privada 'headers' e a inicializa com um novo objeto HttpHeaders.
  // Define o cabeçalho 'Content-Type' como 'application/json'.
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  // Construtor da classe. Injeta uma instância do serviço HttpClient como uma dependência.
  constructor(private httpClient: HttpClient) {}

  // Método 'gerarRelatorio' que aceita um parâmetro 'dados'.
  // Este método faz uma requisição POST para a URL '/gerarRelatorio' com os 'dados' fornecidos.
  // Ele envia a requisição com os cabeçalhos definidos na propriedade 'headers'.
  gerarRelatorio(dados: any) {
    return this.httpClient.post(`${this.url}/gerarRelatorio`, dados, {
      headers: this.headers,
    });
  }

  // Método 'getPdf' que aceita um parâmetro 'dados'.
  // Este método faz uma requisição POST para a URL '/getPdf' com os 'dados' fornecidos,
  // e espera receber uma resposta do tipo Blob (geralmente um arquivo, como um PDF).
  getPdf(dados: any): Observable<Blob> {
    return this.httpClient.post(`${this.url}/getPdf`, dados, {
      responseType: 'blob',
    });
  }

  // Método 'getCompra' que não aceita parâmetros.
  // Este método faz uma requisição GET para a URL '/getCompra'
  // para obter dados relacionados a uma compra.
  getCompra() {
    return this.httpClient.get(`${this.url}/getCompra`);
  }

  deleteCompra(id: any) {
    return this.httpClient.post(`${this.url}/delete/` + id, {
      headers: this.headers,
    });
  }
}
