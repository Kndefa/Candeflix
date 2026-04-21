import { computed, Injectable, signal } from '@angular/core';
import { Preferit } from '../models';

@Injectable({
  providedIn: 'root'
})
export class PreferitsService {
  private readonly CLAU_STORAGE = 'preferits-cataleg';
  private readonly preferitsSignal = signal<Preferit[]>([]);

  readonly preferits = this.preferitsSignal.asReadonly();
  readonly totalPreferits = computed(() => this.preferitsSignal().length);

  constructor() {
    this.carregarPreferits();
  }

  /**
   * Carrega preferits des de localStorage
   */
  private carregarPreferits(): void {
    const dades = localStorage.getItem(this.CLAU_STORAGE);
    if (dades) {
      try {
        const preferits = JSON.parse(dades) as Preferit[];
        // Convertir strings de data a objectes Date
        preferits.forEach(p => p.dataAfegit = new Date(p.dataAfegit));
        this.preferitsSignal.set(preferits);
      } catch (error) {
        console.error('Error carregant preferits:', error);
        this.preferitsSignal.set([]);
      }
    }
  }

  /**
   * Desa preferits a localStorage
   */
  private desarPreferits(): void {
    localStorage.setItem(this.CLAU_STORAGE, JSON.stringify(this.preferitsSignal()));
  }

  /**
   * Afegeix un element als preferits
   */
  afegirPreferit(movieId: string, movieNom: string): void {
    if (this.esPreferit(movieId)) {
      return;
    }

    const nouPreferit: Preferit = {
      movieId,
      movieNom,
      notes: [],
      dataAfegit: new Date()
    };

    this.preferitsSignal.update(preferits => [...preferits, nouPreferit]);
    this.desarPreferits();
  }

  /**
   * Elimina un element dels preferits
   */
  eliminarPreferit(movieId: string): void {
    this.preferitsSignal.update(preferits =>
      preferits.filter(p => p.movieId !== movieId)
    );
    this.desarPreferits();
  }

  /**
   * Afegeix una nota a un preferit
   */
  afegirNota(movieId: string, nota: string): void {
    this.preferitsSignal.update(preferits =>
      preferits.map(p => {
        if (p.movieId === movieId) {
          return { ...p, notes: [...p.notes, nota] };
        }
        return p;
      })
    );
    this.desarPreferits();
  }

  /**
   * Elimina una nota d'un preferit
   */
  eliminarNota(movieId: string, indexNota: number): void {
    this.preferitsSignal.update(preferits =>
      preferits.map(p => {
        if (p.movieId === movieId) {
          const notesActualitzades = [...p.notes];
          notesActualitzades.splice(indexNota, 1);
          return { ...p, notes: notesActualitzades };
        }
        return p;
      })
    );
    this.desarPreferits();
  }

  /**
   * Comprova si un element és preferit
   */
  esPreferit(movieId: string): boolean {
    return this.preferitsSignal().some(p => p.movieId === movieId);
  }

  /**
   * Obté un preferit per ID
   */
  obtenirPreferit(movieId: string): Preferit | undefined {
    return this.preferitsSignal().find(p => p.movieId === movieId);
  }
}