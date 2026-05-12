import { Component, computed, inject } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { MovieCataleg } from '../../models';
import { TargetaMovieComponent } from '../../components/targeta-movie/targeta-movie.component';
import { FormulariCercaComponent } from '../../components/formulari-cerca/formulari-cerca.component';

@Component({
  selector: 'app-cerca',
  standalone: true,
  imports: [TargetaMovieComponent, FormulariCercaComponent],
  templateUrl: './cerca.component.html',
  styleUrl: './cerca.component.scss'
})
export class CercaComponent {
  private movieService = inject(MovieService);
  movies = this.movieService.movies;
  carregant = this.movieService.estat;
  error = this.movieService.error;
  teMovies = computed(() => this.movies().length > 0);

  trackByMovieId(index: number, movie: MovieCataleg): string {
    return movie.id;
  }
}
