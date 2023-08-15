import { Injectable } from "@angular/core"

// Interface para representar os itens do menu
export interface Menu {
  state: string; // Estado da rota
  nome: string; // Nome do item de menu
  type: string; // Tipo do item (pode ser 'link', 'sub' ou 'ext')
  icon: string; // Ícone associado ao item
  role: string; // Papel de permissão associado ao item
}

// Declaração do array de itens de menu
const MENUITEMS = [
  { state: 'dashboard', nome: 'Dashboard', type: 'link', icon: 'dashboard', role: '' },
  { state: 'categoria', nome: 'Gerenciar Categorias', type: 'link', icon: 'category', role: 'admin' }
]

// Serviço injetável para fornecer itens de menu
@Injectable()
export class MenuItems {
  // Método para obter os itens de menu
  getMenuItem(): Menu[] {
    return MENUITEMS; // Retorna o array de itens de menu
  }
}
