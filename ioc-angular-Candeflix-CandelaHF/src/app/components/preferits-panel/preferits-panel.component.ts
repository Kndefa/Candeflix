import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Preferit } from '../../models';
import { PreferitsService } from '../../services/preferits.service';


@Component({
  selector: 'app-preferits-panel',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './preferits-panel.component.html',
  styleUrl: './preferits-panel.component.scss'
})
export class PreferitsPanelComponent {
  preferitSeleccionat: Preferit | null = null;
  private fb = inject(FormBuilder);
  public preferitsService = inject(PreferitsService);
  formulariNotes = this.fb.group({
    notes: this.fb.array([])
  });

  get notes(): FormArray {
    return this.formulariNotes.get('notes') as FormArray;
  }

  seleccionarPreferit(preferit: Preferit): void {
    this.preferitSeleccionat = preferit;
    this.notes.clear();

    // Carregar notes existents al FormArray
    preferit.notes.forEach(nota => {
      this.notes.push(this.fb.control(nota, [Validators.required, Validators.minLength(3)]));
    });

    // Afegir camp buit per nova nota
    this.notes.push(this.fb.control('', [Validators.required, Validators.minLength(3)]));
  }

  afegirNota(): void {
    if (!this.preferitSeleccionat) return;

    // Obtenir última nota (la buida)
    const ultimIndex = this.notes.length - 1;
    const ultimControl = this.notes.at(ultimIndex);

    if (ultimControl.valid) {
      const nota = ultimControl.value;
      this.preferitsService.afegirNota(this.preferitSeleccionat.movieId, nota);

      // Recarregar preferit actualitzat
      const preferitActualitzat = this.preferitsService.obtenirPreferit(this.preferitSeleccionat.movieId);
      if (preferitActualitzat) {
        this.seleccionarPreferit(preferitActualitzat);
      }
    }
  }

  eliminarNota(index: number): void {
    if (!this.preferitSeleccionat) return;

    this.preferitsService.eliminarNota(this.preferitSeleccionat.movieId, index);

    // Recarregar preferit actualitzat
    const preferitActualitzat = this.preferitsService.obtenirPreferit(this.preferitSeleccionat.movieId);
    if (preferitActualitzat) {
      this.seleccionarPreferit(preferitActualitzat);
    } else {
      this.preferitSeleccionat = null;
      this.notes.clear();
    }
  }

  eliminarPreferit(movieId: string): void {
    this.preferitsService.eliminarPreferit(movieId);
    if (this.preferitSeleccionat?.movieId === movieId) {
      this.preferitSeleccionat = null;
      this.notes.clear();
    }
  }

  tancarPanel(): void {
    this.preferitSeleccionat = null;
    this.notes.clear();
  }
}