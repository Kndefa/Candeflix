import { Component } from '@angular/core';
import { MockMovies } from '../../mocks/dades-mock';
import { TargetaMovieComponent } from "../targeta-movie/targeta-movie.component";
@Component({
  selector: 'app-llista-movies',
  standalone: true,
  imports: [TargetaMovieComponent],
  templateUrl: './llista-movies.component.html',
  styleUrl: './llista-movies.component.scss'
})
export class LlistaMoviesComponent {
  public movies = MockMovies;
  constructor() {
    console.log(this.movies);
  }
}
