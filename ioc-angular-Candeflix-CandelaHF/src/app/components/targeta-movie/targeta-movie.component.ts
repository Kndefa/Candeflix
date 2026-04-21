import { Component, inject, Input } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { MovieCataleg } from '../../models';
import { PreferitsService } from '../../services/preferits.service';

@Component({
  selector: 'app-targeta-movie',
  standalone: true,
  imports: [UpperCasePipe],
  templateUrl: './targeta-movie.component.html',
  styleUrl: './targeta-movie.component.scss'
})
export class TargetaMovieComponent {
  @Input() movie?: MovieCataleg;
  private preferitsService = inject(PreferitsService);

  get esPreferit() {
    return this.movie ? this.preferitsService.esPreferit(this.movie.id) : false;
  }

  togglePreferit(): void {
    if (this.esPreferit) {
      this.preferitsService.eliminarPreferit(this.movie!.id);
    } else {
      this.preferitsService.afegirPreferit(this.movie!.id, this.movie!.titol);
    }
  }
}
