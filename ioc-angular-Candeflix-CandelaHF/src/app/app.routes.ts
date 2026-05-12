import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/pelicula', pathMatch: 'full' },
  {
    path: 'pelicula',
    loadComponent: () => import('./pages/pelicula/pelicula.component').then(m => m.PeliculaComponent)
  },
  {
    path: 'cerca',
    loadComponent: () => import('./pages/cerca/cerca.component').then(m => m.CercaComponent)
  },
  {
    path: 'detall/:id',
    loadComponent: () => import('./pages/detall/detall.component').then(m => m.DetallComponent)
  },
  {
    path: 'preferits',
    canActivate: [authGuard],
    loadComponent: () => import('./favorites/pages/preferits/preferits.component').then(m => m.PreferitsComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: '404',
    loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent)
  },
  { path: '**', redirectTo: '/404' }
];
