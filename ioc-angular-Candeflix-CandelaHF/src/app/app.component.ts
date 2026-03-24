import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LlistaMoviesComponent } from './components/llista-movies/llista-movies.component';
import { BarraCercaComponent } from "./components/barra-cerca/barra-cerca.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LlistaMoviesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ioc-angular-Candeflix-CandelaHF';

  constructor() {
    console.log('Candeflix ha inicializado correctamente!');
  }
}
