import { Component, computed, inject, OnInit } from '@angular/core';
import { TargetaMovieComponent } from "../targeta-movie/targeta-movie.component";
import { NgFor, NgIf } from '@angular/common';
import { MovieService } from '../../services/movie.service';
import { MovieCataleg } from '../../models';

@Component({
  selector: 'app-llista-movies',
  standalone: true,
  imports: [TargetaMovieComponent, NgFor, NgIf],
  templateUrl: './llista-movies.component.html',
  styleUrl: './llista-movies.component.scss'
})
export class LlistaMoviesComponent implements OnInit {

  public moviesService = inject(MovieService);
  public moviesFiltrades = this.moviesService.movies;
  readonly teMovies = computed(() => this.moviesFiltrades().length > 0);
  public carregant = this.moviesService.estat;
  public error = this.moviesService.error;

  ngOnInit(): void {
    this.moviesService.obtenirPopulars();
  }

  trackByMovieId(index: number, movie: MovieCataleg): string {
    return movie.id;
  }

  onCercarMovies(text: string): void {
    // this.moviesFiltrades = text && text.length >= 3 ? this.movies.filter(movie => movie.name.toLowerCase().includes(text.toLowerCase())) : [...this.movies];
    this.moviesService.cercar(text);
  }

}
