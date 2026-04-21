import { Component, computed, inject, OnInit } from '@angular/core';
import { TargetaMovieComponent } from "../targeta-movie/targeta-movie.component";
import { NgFor, NgIf } from '@angular/common';
import { BarraCercaComponent } from "../barra-cerca/barra-cerca.component";
import { MovieService } from '../../services/movie.service';
import { MovieCataleg } from '../../models';
import { FormulariCercaComponent } from '../formulari-cerca/formulari-cerca.component';
import { PreferitsPanelComponent } from '../preferits-panel/preferits-panel.component';

@Component({
  selector: 'app-cataleg-page',
  standalone: true,
  imports: [TargetaMovieComponent, NgFor, NgIf, BarraCercaComponent, FormulariCercaComponent, PreferitsPanelComponent],
  templateUrl: './cataleg-page.component.html',
  styleUrl: './cataleg-page.component.scss'
})
export class CatalegPageComponent implements OnInit {

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
    this.moviesService.cercar(text);
  }

}
