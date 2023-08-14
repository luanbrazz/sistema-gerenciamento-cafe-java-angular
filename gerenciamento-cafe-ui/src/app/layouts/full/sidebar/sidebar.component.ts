import { MenuItems } from 'src/app/shared/menu-items'; // Importa o serviço MenuItems
import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core'; // Importa classes do Angular
import { MediaMatcher } from '@angular/cdk/layout'; // Importa o MediaMatcher para lidar com a responsividade

@Component({
  selector: 'app-sidebar', // Seletor CSS para identificar o componente no template
  templateUrl: './sidebar.component.html', // URL do template HTML associado ao componente
  styleUrls: [] // Array de URLs de arquivos de estilo associados ao componente
})
export class AppSidebarComponent implements OnDestroy {
  mobileQuery: MediaQueryList; // Declaração de uma variável para a mídia de consulta responsiva

  usuarioRole: any; // Declaração de uma propriedade chamada 'usuarioRole'
  token: any = localStorage.getItem('token'); // Recupera o token do armazenamento local
  tokenPayload: any; // Declaração de uma propriedade para armazenar o payload do token

  private _mobileQueryListener: () => void; // Declaração de uma função para ouvir alterações na mídia

  constructor(
    changeDetectorRef: ChangeDetectorRef, // Injeção do ChangeDetectorRef para detectar mudanças
    media: MediaMatcher, // Injeção do MediaMatcher para lidar com a responsividade
    public menuitems: MenuItems // Injeção do serviço MenuItems
  ) {
    // Tente decodificar o token manualmente
    try {
      // Divide o token em cabeçalho e carga útil, e decodifica a carga útil
      const [headerBase64, payloadBase64] = this.token.split('.');
      const payload = JSON.parse(atob(payloadBase64));
      this.tokenPayload = payload;

      this.usuarioRole = this.tokenPayload?.role; // Atribui a role do usuário à propriedade 'usuarioRole'
    } catch (error) {
      // Se a decodificação falhar, exibe o erro, limpa o armazenamento local e redireciona para a página inicial
      console.error("Erro ao decodificar o token:", error);
      localStorage.clear(); // Limpa o armazenamento local
      // Outras ações, se necessário
    }

    // Define a mídia de consulta responsiva para o tamanho mínimo de 768px
    this.mobileQuery = media.matchMedia('(min-width: 768px)');

    // Define uma função para detectar mudanças e atualizar a interface do usuário
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();

    // Adiciona um ouvinte à mídia de consulta responsiva
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  // Método chamado quando o componente está sendo destruído
  ngOnDestroy(): void {
    // Remove o ouvinte da mídia de consulta responsiva
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
