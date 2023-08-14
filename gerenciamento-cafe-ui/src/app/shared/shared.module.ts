import { NgModule } from '@angular/core'; // Importa a classe NgModule para criar um módulo

import { AccordionAnchorDirective, AccordionLinkDirective, AccordionDirective } from './accordion'; // Importa diretivas personalizadas
import { MenuItems } from './menu-items'; // Importa o serviço MenuItems

@NgModule({
  declarations: [
    AccordionAnchorDirective, // Declara a diretiva AccordionAnchorDirective
    AccordionLinkDirective, // Declara a diretiva AccordionLinkDirective
    AccordionDirective // Declara a diretiva AccordionDirective
  ],
  exports: [
    AccordionAnchorDirective, // Exporta a diretiva AccordionAnchorDirective
    AccordionLinkDirective, // Exporta a diretiva AccordionLinkDirective
    AccordionDirective // Exporta a diretiva AccordionDirective
  ],
  providers: [MenuItems] // Define o provedor de serviço MenuItems
})
export class SharedModule { } // Exporta a classe do módulo SharedModule
