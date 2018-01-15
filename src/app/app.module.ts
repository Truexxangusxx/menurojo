import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ContenedorComponent } from './contenedor/contenedor.component';
import { MenupersonasComponent } from './menupersonas/menupersonas.component';
import { PaginaComponent } from './pagina/pagina.component';


@NgModule({
  declarations: [
    AppComponent,
    ContenedorComponent,
    MenupersonasComponent,
    PaginaComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
