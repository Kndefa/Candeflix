import { Component } from '@angular/core';
import { MockMovies } from '../../mocks/dades-mock';
import { TargetaMovieComponent } from "../targeta-movie/targeta-movie.component";
import { NgFor, NgIf } from '@angular/common';
import { Movie } from '../../models/element.model';
import { BarraCercaComponent } from "../barra-cerca/barra-cerca.component";
@Component({
  selector: 'app-llista-movies',
  standalone: true,
  imports: [TargetaMovieComponent, NgFor, NgIf, BarraCercaComponent],
  templateUrl: './llista-movies.component.html',
  styleUrl: './llista-movies.component.scss'
})
export class LlistaMoviesComponent {
  public movies = MockMovies;
  public moviesFiltrades: Movie[] = [...MockMovies];

  trackByMovieId(index: number, movie: Movie): string {
    return movie.id;
  }

  onCercarMovies(text: any): void {
    this.moviesFiltrades = text && text.length >= 3 ? this.movies.filter(movie => movie.name.toLowerCase().includes(text.toLowerCase())) : [...this.movies];
  }

}
