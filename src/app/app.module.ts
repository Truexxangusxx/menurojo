import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';


import { AppComponent } from './app.component';
import { ContenedorComponent } from './contenedor/contenedor.component';
import { MenupersonasComponent } from './menupersonas/menupersonas.component';
import { PaginaComponent } from './pagina/pagina.component';
import { TicketComponent } from './ticket/ticket.component';
import { NegociomenuComponent } from './negociomenu/negociomenu.component';
import { EmpresamenuComponent } from './empresamenu/empresamenu.component';


@NgModule({
  declarations: [
    AppComponent,
    ContenedorComponent,
    MenupersonasComponent,
    PaginaComponent,
    TicketComponent,
    NegociomenuComponent,
    EmpresamenuComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {
        path: 'negocios',
        component: NegociomenuComponent
      },
      {
        path: '',
        component: MenupersonasComponent
      },
      {
        path: 'empresas',
        component: EmpresamenuComponent
      },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
