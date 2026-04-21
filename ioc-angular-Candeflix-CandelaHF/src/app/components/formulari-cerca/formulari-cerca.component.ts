import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { MovieService } from '../../services/movie.service';
import { titolDisponibleValidator } from '../../validators/movie-title.validator';

@Component({
  selector: 'app-formulari-cerca',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './formulari-cerca.component.html',
  styleUrl: './formulari-cerca.component.scss'
})
export class FormulariCercaComponent implements OnInit {
  formulariCerca!: FormGroup;
  private fb = inject(FormBuilder);
  private movieService = inject(MovieService);

  ngOnInit(): void {
    this.formulariCerca = this.fb.group({
      terme: ['', [
        Validators.minLength(3),
        Validators.maxLength(50),
      ], [titolDisponibleValidator(this.movieService)]]
    });

    // Cerca automàtica amb debounce
    this.formulariCerca.get('terme')?.valueChanges
      .pipe(debounceTime(400))
      .subscribe(terme => {
        if (this.formulariCerca.get('terme')?.valid) {
          this.cercar();
        }
      });
  }

  cercar(): void {
    const terme = this.formulariCerca.get('terme')?.value;
    this.movieService.cercar(terme);
  }

  netejar(): void {
    this.formulariCerca.reset();
    this.movieService.obtenirPopulars();
  }

  get estaCarregant(): boolean {
    return this.movieService.estat();
  }

  get termeInvalid(): boolean {
    const control = this.formulariCerca.get('terme');
    return !!(control?.invalid && control?.touched);
  }

  get estaValidant(): boolean {
    return this.formulariCerca.get('terme')?.status === 'PENDING';
  }

  get missatgeError(): string {
    const control = this.formulariCerca.get('terme');
    if (control?.hasError('minlength')) return 'Mínim 3 caràcters';
    if (control?.hasError('maxlength')) return 'Màxim 50 caràcters';
    if (control?.hasError('sensResultats')) return 'Aquest títol no està disponible';
    return '';
  }
}