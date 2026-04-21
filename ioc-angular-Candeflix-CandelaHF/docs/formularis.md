# Formularis

## FormulariCercaComponent

### Funcionalitat

Formulari reactiu per cercar pel·lícules del catàleg. Permet introduir un terme de cerca i executa cerques automàtiques sobre el servei de pel·lícules.

El component està basat en **Reactive Forms** i integra validació síncrona, validació asíncrona i cerca automàtica amb *debounce*.

---

## Validacions

### Validacions síncrones

S’apliquen directament al control del formulari:

| Camp  | Validació        | Comportament |
|------|------------------|--------------|
| terme | `minLength(3)`   | Requereix mínim 3 caràcters |
| terme | `maxLength(50)`  | Limita el text a 50 caràcters |

### Missatges d’error (validació síncrona)

| Error | Missatge |
|------|----------|
| minlength | "Mínim 3 caràcters" |
| maxlength | "Màxim 50 caràcters" |

---

### Validació asíncrona

S’aplica un validador asíncron personalitzat:

- `titolDisponibleValidator(movieService)`

**Comportament:**
- Consulta el servei per verificar si el títol existeix o és vàlid
- Retorna estat `PENDING` mentre es resol la validació
- Si el títol no és vàlid, retorna l’error `titolNoDisponible`

| Error | Missatge |
|------|----------|
| titolNoDisponible | "Aquest títol no està disponible" |

---

## Debounce i cerca automàtica

### Comportament del debounce

El camp `terme` està subscrit a `valueChanges` amb:

- `debounceTime(400ms)`

### Funcionament

- L’usuari escriu al camp de cerca
- El sistema espera **400 ms sense canvis**
- Si el formulari és vàlid, s’executa la cerca automàtica
- Evita múltiples peticions mentre l’usuari escriu

---

### Condicions per executar la cerca

La cerca només s’executa si:

- El formulari és vàlid (`valid`)
- El camp no té errors de validació
- Ha passat el temps de debounce

---

## Comportament general del formulari

### Cerca

- Executa `movieService.cercar(terme)`
- Actualitza els resultats del catàleg

### Netejar

- Reinicia el formulari (`reset()`)
- Torna a carregar les pel·lícules populars (`obtenirPopulars()`)

---

## Estats del formulari

### Indicadors

| Estat | Descripció |
|------|------------|
| `estaCarregant` | Indica si el servei està carregant dades |
| `estaValidant` | Indica si la validació asíncrona està en curs (`PENDING`) |
| `termeInvalid` | Indica si el camp és invàlid i ha estat tocat |

---

## Resum del flux

1. Usuari escriu al camp `terme`
2. S’apliquen validacions síncrones immediatament
3. Si el valor és vàlid, s’inicia validació asíncrona
4. S’aplica debounce de 400ms
5. Si tot és correcte, es fa la cerca automàtica
6. Es mostren resultats via `MovieService`

---

## Ús de FormArray

### PreferitsPanelComponent

Aquest component utilitza un `FormArray` per gestionar dinàmicament una llista de notes associades a un element preferit.

### Estructura del formulari

El formulari principal està format per:

- `notes`: FormArray de controls de text

Cada element del FormArray representa una nota individual.

---

### Comportament del FormArray

- Es carreguen les notes existents del preferit seleccionat
- Cada nota es transforma en un `FormControl` amb validació
- Es permet afegir una nova nota mitjançant un camp buit al final
- Les notes es poden eliminar individualment
- El formulari es reinicialitza cada vegada que es selecciona un altre preferit

---

### Validacions aplicades

Cada control del FormArray té:

| Validació | Comportament |
|----------|--------------|
| `required` | La nota no pot estar buida |
| `minLength(3)` | Mínim 3 caràcters per nota |

---

### Flux de funcionament

1. L’usuari selecciona un preferit
2. Es carreguen les notes al FormArray
3. Es mostra un camp buit per afegir una nova nota
4. Si el camp és vàlid, es pot afegir la nota
5. Les notes es sincronitzen amb el servei
6. El FormArray es reinicialitza després de cada canvi

---

### Operacions principals

- **Afegir nota**
  - Valida l’últim control del FormArray
  - Afegeix la nota al servei
  - Recarrega el preferit actualitzat

- **Eliminar nota**
  - Elimina la nota per índex
  - Actualitza el servei i el FormArray

- **Eliminar preferit**
  - Esborra completament el preferit i el seu FormArray

---

### Resum

Aquest component exemplifica l’ús avançat de `FormArray` per gestionar llistes dinàmiques dins de formularis reactius, permetent afegir, eliminar i sincronitzar elements amb un servei centralitzat.