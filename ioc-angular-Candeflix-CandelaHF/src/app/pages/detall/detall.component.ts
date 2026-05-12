import { Component, inject, OnInit, signal, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UpperCasePipe, CurrencyPipe } from '@angular/common';
import { MovieService } from '../../services/movie.service';
import { MovieCataleg } from '../../models';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-detall',
  standalone: true,
  imports: [RouterLink, UpperCasePipe, CurrencyPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './detall.component.html',
  styleUrl: './detall.component.scss'
})
export class DetallComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private movieService = inject(MovieService);

  movie = signal<MovieCataleg | null>(null);
  carregant = signal<boolean>(true);
  error = signal<string | null>(null);

  ngOnInit(): void {
    const idParam = this.route.snapshot.params['id'];
    const idNumber = Number(idParam);

    if (!idParam || isNaN(idNumber) || idNumber <= 0) {
      this.error.set('ID de pel·lícula no vàlid');
      this.carregant.set(false);
      return;
    }

    this.carregant.set(true);
    this.movieService.obtenirPerId(idParam)
      .pipe(finalize(() => this.carregant.set(false)))
      .subscribe({
        next: (movie) => {
          if (movie) {
            this.movie.set(movie);
          } else {
            this.error.set('Pel·lícula no trobada');
          }
        },
        error: () => {
          this.error.set('Error carregant la pel·lícula');
        }
      });
  }

  navegarAnterior(): void {
    const idActual = Number(this.route.snapshot.params['id']);
    if (idActual > 1) {
      this.router.navigate(['/detall', idActual - 1]);
    }
  }

  navegarSeguent(): void {
    const idActual = Number(this.route.snapshot.params['id']);
    this.router.navigate(['/detall', idActual + 1]);
  }
}
