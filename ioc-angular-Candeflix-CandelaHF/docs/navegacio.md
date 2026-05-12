# Navegació

## Mapa de rutes

| Path | Component | Accés |
|------|-----------|-------|
| `""` | Redirigeix a `/pelicula` | Públic |
| `pelicula` | `PeliculaComponent` | Públic |
| `cerca` | `CercaComponent` | Públic |
| `detall/:id` | `DetallComponent` | Públic |
| `preferits` | `PreferitsComponent` | **Privat** (requereix autenticació) |
| `login` | `LoginComponent` | Públic |
| `404` | `NotFoundComponent` | Públic |
| `**` | Redirigeix a `/404` | Públic |

---

## Configuració del roter

### provideRouter

El roter es configura a `app.config.ts` mitjançant `provideRouter(routes)`, que registra les rutes definides a `app.routes.ts` a nivell d'aplicació. La configuració s'injecta via `bootstrapApplication` a `main.ts`.

La majoria de rutes carreguen els components de forma _lazy_ amb `loadComponent()`, excepte les redireccions. La ruta `preferits` utilitza `canActivate: [authGuard]` per restringir l'accés a usuaris autenticats.

---

### RouterOutlet

`RouterOutlet` s'importa directament al component principal `AppComponent` i es col·loca a la plantilla per indicar on es renderitza el component de la ruta activa.

---

### RouterLink

`RouterLink` (i `RouterLinkActive`) s'importen als components que necessiten navegació, com `HeaderComponent`, per generar enllaços de navegació interns sense recarregar la pàgina.
