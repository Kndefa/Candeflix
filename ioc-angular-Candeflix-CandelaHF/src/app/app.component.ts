import { Component } from '@angular/core';
import { LlistaMoviesComponent } from './components/llista-movies/llista-movies.component';
import { BarraCercaComponent } from "./components/barra-cerca/barra-cerca.component";
import { CatalegPageComponent } from './components/cataleg-page/cataleg-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LlistaMoviesComponent, BarraCercaComponent, CatalegPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  constructor() {
    console.log('Candeflix ha inicializado correctamente!');
  }
}
