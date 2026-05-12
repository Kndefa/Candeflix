import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { Usuari } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, AsyncPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  private authService = inject(AuthService);
  usuari$!: Observable<Usuari | null>;

  ngOnInit(): void {
    this.usuari$ = this.authService.obtenirUsuari();
  }

  logout(): void {
    this.authService.logout();
  }
}
