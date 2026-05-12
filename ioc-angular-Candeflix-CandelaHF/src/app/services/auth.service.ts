import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Usuari {
  id: number;
  nom: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly CLAU_SESSIO = 'candeflix-sessio';
  private usuariActualSubject = new BehaviorSubject<Usuari | null>(null);
  readonly usuariActual$: Observable<Usuari | null> = this.usuariActualSubject.asObservable();

  constructor() {
    this.carregarSessio();
  }

  estaAutenticat(): boolean {
    return this.usuariActualSubject.value !== null;
  }

  obtenirUsuari(): Observable<Usuari | null> {
    return this.usuariActual$;
  }

  login(email: string, contrasenya: string): boolean {
    if (email === 'admin@test.com' && contrasenya === '1234') {
      const usuari: Usuari = { id: 1, nom: 'Admin', email };
      this.usuariActualSubject.next(usuari);
      this.desarSessio(usuari);
      return true;
    }
    return false;
  }

  logout(): void {
    this.usuariActualSubject.next(null);
    localStorage.removeItem(this.CLAU_SESSIO);
  }

  private carregarSessio(): void {
    const dades = localStorage.getItem(this.CLAU_SESSIO);
    if (dades) {
      try {
        const usuari = JSON.parse(dades) as Usuari;
        this.usuariActualSubject.next(usuari);
      } catch {
        this.usuariActualSubject.next(null);
      }
    }
  }

  private desarSessio(usuari: Usuari): void {
    localStorage.setItem(this.CLAU_SESSIO, JSON.stringify(usuari));
  }
}
