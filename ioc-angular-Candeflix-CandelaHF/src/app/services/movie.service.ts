import { inject, Injectable, signal } from '@angular/core';
import { MovieAPIResponse, MovieCataleg, MovieResponse } from '../models';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environment/environment.development';
import { adaptarMoviesApi, adaptarMovieApi } from '../adaptadors/movieCataleg.adaptador';
import { catchError, map, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private httpClient = inject(HttpClient);

  // Signals per gestionar l'estat de forma reactiva
  private readonly moviesSignal = signal<MovieCataleg[]>([]);
  private readonly carregantSignal = signal<boolean>(false);
  private readonly errorSignal = signal<string | null>(null);

  // Exposem signals com a només lectura
  readonly movies = this.moviesSignal.asReadonly();
  readonly estat = this.carregantSignal.asReadonly();
  readonly error = this.errorSignal.asReadonly();


  private readonly apiUrl = environment.apiUrl;

  obtenirPopulars(): void {
    this.carregantSignal.set(true);
    this.errorSignal.set(null);

    this.httpClient.get<MovieAPIResponse>(`${this.apiUrl}/results?popular=true`)
      .pipe(
        map(result => adaptarMoviesApi(result)),
        tap(movies => {
          this.moviesSignal.set(movies);
          this.carregantSignal.set(false);
          this.errorSignal.set(null);
        }),
        catchError((error: HttpErrorResponse) => {
          const missatgeError = this.gestionarError(error);
          this.errorSignal.set(missatgeError);
          this.carregantSignal.set(false);
          this.moviesSignal.set([]);
          return of([]);
        })
      )
      .subscribe();
  }

  cercar(query: string): void {
    if (!query?.trim()) {
      this.obtenirPopulars();
      return;
    }

    this.carregantSignal.set(true);
    this.errorSignal.set(null);
    
    this.httpClient.get<MovieAPIResponse>(`${this.apiUrl}/results?nom:contains=${query}`)
      .pipe(
        map(result => adaptarMoviesApi(result)),
        tap(movies => {
          this.moviesSignal.set(movies);
          this.carregantSignal.set(false);
          this.errorSignal.set(null);
        }),
        catchError((error: HttpErrorResponse) => {
          const missatgeError = this.gestionarError(error);
          this.errorSignal.set(missatgeError);
          this.carregantSignal.set(false);
          this.moviesSignal.set([]);
          return of([]);
        })
      )
      .subscribe();
  }

  obtenirPerId(id: string): Observable<MovieCataleg | null> {
    return this.httpClient.get<MovieResponse>(`${this.apiUrl}/results/${id}`)
      .pipe(
        map(result => adaptarMovieApi(result)),
        catchError(() => of(null))
      );
  }

  titolDisponible(titol: string): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.httpClient.get<MovieAPIResponse>(`${this.apiUrl}/results?nom:contains=${titol}`)
          .subscribe({
            next: (movies) => resolve(movies.length > 0),
            error: () => resolve(false)
          });
      }, 500);  // Simula latència de validació
    });
  }

  private gestionarError(error: HttpErrorResponse): string {
    if (error.error instanceof ErrorEvent) {
      // Error de client o xarxa
      return `Error de xarxa: ${error.error.message}`;
    }

    // Error del servidor
    switch (error.status) {
      case 0:
        return 'No es pot connectar al servidor. Comprova que json-server està actiu.';
      case 404:
        return 'Endpoint no trobat. Verifica la URL de l\'API.';
      case 500:
        return 'Error intern del servidor.';
      default:
        return `Error desconegut (${error.status}): ${error.message}`;
    }
  }
}
