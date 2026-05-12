# Optimització

## Estratègia OnPush

| Component | Motiu |
|-----------|-------|
| `FooterComponent` | Component estàtic sense canvis d'estat interns. No requereix detecció de canvis periòdica. |
| `DetallComponent` | Gestió d'estat amb `signal()`. OnPush evita re-renderitzats innecessaris aprofitant el canvi reactiu de signals. |
| `TargetaMovieComponent` | Component presentacional pur amb `@Input()`. Només s'ha de renderitzar quan canvien les propietats d'entrada o els events del servei subscrit. |

---

## Virtualització

### Configuració

La virtualització s'implementa al component `PeliculaComponent` mitjançant `ScrollingModule` d'Angular CDK.

| Paràmetre | Valor |
|-----------|-------|
| `itemSize` | `320` (píxels per fila) |
| Viewport | `height: calc(100vh - 250px)` |
| Agrupació | 3 pel·lícules per fila (`moviesRowGroups`) |
| Nombre d'elements | Dinàmic — depèn de la resposta de l'API `obtenirPopulars()` |

### Funcionament

- Les pel·lícules es divideixen en grups de 3 (`moviesRowGroups`) per formar files
- `cdk-virtual-scroll-viewport` renderitza només les files visibles al viewport
- `trackByRowIndex` optimitza el renderitzat evitant recrear els nodes DOM existents
