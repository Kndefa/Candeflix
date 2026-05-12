# Candeflix

**Autora:** Candela Hernandez Fano

Aplicació web de catàleg i cerca de pel·lícules. Permet navegar per un llistat de pel·lícules populars, cercar per títol, veure'n els detalls (sinopsi, repartiment, director, preu, estoc, puntuació) i gestionar una llista de preferits amb notes personals.

## Mapa de rutes

| Path | Component | Accés |
|------|-----------|-------|
| `/` | Redirecció a `/pelicula` | Públic |
| `/pelicula` | `PeliculaComponent` | Públic |
| `/cerca` | `CercaComponent` | Públic |
| `/detall/:id` | `DetallComponent` | Públic |
| `/preferits` | `PreferitsComponent` | **Privat** (requereix autenticació) |
| `/login` | `LoginComponent` | Públic |
| `/404` | `NotFoundComponent` | Públic |
| `/**` | Redirecció a `/404` | Públic |

## Instruccions d'execució en local

```bash
git clone <url-del-repositori>
cd Candeflix/ioc-angular-Candeflix-CandelaHF
npm install
ng serve
```

Obrir [http://localhost:4200](http://localhost:4200)

L'API simulada amb `json-server` s'inicia automàticament amb `ng serve` o manualment amb:

```bash
npx json-server tools/api/peliculas.json --port 4301
```

## Build de producció

```bash
ng build --configuration production
```

El build es genera a `dist/ioc-angular-candeflix-candela-hf/browser/`. La mida total del bundle de JavaScript i CSS és d'aproximadament **430 kB**.

## Credencials de prova

| Email | Contrasenya |
|-------|-------------|
| `admin@test.com` | `1234` |
