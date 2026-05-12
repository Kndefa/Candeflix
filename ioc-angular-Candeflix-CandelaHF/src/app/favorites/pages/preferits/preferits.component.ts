import { Component, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PreferitsService } from '../../../services/preferits.service';

@Component({
  selector: 'app-preferits',
  standalone: true,
  imports: [RouterLink, DatePipe],
  templateUrl: './preferits.component.html',
  styleUrl: './preferits.component.scss'
})
export class PreferitsComponent {
  private preferitsService = inject(PreferitsService);
  preferits = this.preferitsService.preferits;

  eliminarPreferit(movieId: string): void {
    this.preferitsService.eliminarPreferit(movieId);
  }
}
