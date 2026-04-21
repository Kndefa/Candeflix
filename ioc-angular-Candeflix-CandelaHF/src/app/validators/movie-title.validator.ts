import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { delay, switchMap } from 'rxjs/operators';
import { MovieService } from '../services/movie.service';

/**
 * Validador asíncron que verifica si un codi de pel·lícula està disponible mitjançant el MovieService.
 */
export function titolDisponibleValidator(movieService: MovieService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
        if (!control.value) {
            return of(null);
        }

        return of(control.value).pipe(
            delay(500),  // Simula latència de xarxa
            switchMap(async (titol: string) => {
                const disponible = await movieService.titolDisponible(titol);
                return disponible ? null : { sensResultats: true };
            })
        ) as Observable<ValidationErrors | null>;
    };
}