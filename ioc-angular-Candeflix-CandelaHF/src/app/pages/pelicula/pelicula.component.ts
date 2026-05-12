import { Component, computed, inject, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { MovieCataleg } from '../../models';
import { TargetaMovieComponent } from '../../components/targeta-movie/targeta-movie.component';
import { FormulariCercaComponent } from '../../components/formulari-cerca/formulari-cerca.component';
import { PreferitsPanelComponent } from '../../components/preferits-panel/preferits-panel.component';
import { ScrollingModule } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-pelicula',
  standalone: true,
  imports: [TargetaMovieComponent, FormulariCercaComponent, PreferitsPanelComponent, ScrollingModule],
  templateUrl: './pelicula.component.html',
  styleUrl: './pelicula.component.scss'
})
export class PeliculaComponent implements OnInit {
  public movieService = inject(MovieService);
  movies = this.movieService.movies;
  carregant = this.movieService.estat;
  error = this.movieService.error;
  teMovies = computed(() => this.movies().length > 0);

  moviesRowGroups = computed(() => {
    const movies = this.movies();
    const rows: MovieCataleg[][] = [];
    for (let i = 0; i < movies.length; i += 3) {
      rows.push(movies.slice(i, i + 3));
    }
    return rows;
  });

  ngOnInit(): void {
    this.movieService.obtenirPopulars();
  }

  trackByRowIndex(index: number): number {
    return index;
  }
}
