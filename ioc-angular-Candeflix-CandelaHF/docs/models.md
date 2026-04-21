# Models i adaptadors

## Interfícies principals

### MovieCataleg (model intern)

Model utilitzat dins l'aplicació Angular:

- Conté les dades adaptades per a ús intern  
- Utilitza convencions camelCase  
- Inclou camps transformats i simplificats per a la UI  

**Camps destacats:**
- `titol`: nom de la pel·lícula adaptat des de l'API  
- `imatgeUrl`: URL completa de la imatge  
- `puntuacio`: valoració mitjana  
- `esPopular`: indica si és popular  
- `unitats`: stock disponible  
- `vots`: nombre de valoracions  
- `data`: data de llançament  

---

### MovieResponse (resposta API)

Format original de les dades que retorna l'API:

- Conté camps en format original (snake_case i altres convencions)  
- Inclou informació addicional no necessària per al model intern  
- Alguns camps tenen noms diferents respecte al model intern  

**Camps destacats:**
- `nom`: títol de la pel·lícula  
- `poster_path`: ruta relativa de la imatge  
- `popular`: indica popularitat  
- `vote_average`: puntuació  
- `vote_count`: nombre de vots  
- `release_date`: data de llançament  
- `stock`: unitats disponibles  
- `preu`: preu de la pel·lícula  

---

## Adaptadors

### adaptarMovieApi()

Transforma una pel·lícula de l'API al format intern:

- Converteix el `id` de number a string  
- Renombra camps per adaptar-los al model intern  
- Construeix la URL completa de la imatge  
- Manté només la informació necessària per a l'aplicació  
- Simplifica l'estructura de dades  

---

### adaptarMoviesApi()

- Aplica `adaptarMovieApi()` a una col·lecció de pel·lícules  
- Retorna un array de pel·lícules en format intern  

---

## Mapeig de camps

| Camp API        | Camp intern  | Transformació        |
|----------------|--------------|----------------------|
| `id`           | `id`         | number → string      |
| `nom`          | `titol`      | Renombrat            |
| `descripcio`   | `descripcio` | Cap                  |
| `categoria`    | `categoria`  | Cap                  |
| `poster_path`  | `imatgeUrl`  | Construcció URL      |
| `popular`      | `esPopular`  | Renombrat            |
| `stock`        | `unitats`    | Renombrat            |
| `preu`         | `preu`       | Cap                  |
| `vote_average` | `puntuacio`  | Renombrat            |
| `vote_count`   | `vots`       | Renombrat            |
| `release_date` | `data`       | Renombrat            |

---

## Notes importants

- La URL de la imatge es construeix a partir de la ruta proporcionada per l'API  
- Alguns camps de l'API no es fan servir en el model intern (com `adult`, `video`, `backdrop_path`, etc.)  
- `descripcio` és un camp opcional  
- `unitats` representa el stock disponible  
- `data` es manté com a string sense transformació addicional