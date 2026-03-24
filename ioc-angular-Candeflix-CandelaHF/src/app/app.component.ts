import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TargetaMovieComponent } from "./components/targeta-movie/targeta-movie.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TargetaMovieComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ioc-angular-Candeflix-CandelaHF';

  constructor() {
    console.log('Candeflix ha inicializado correctamente!');
  }
}
