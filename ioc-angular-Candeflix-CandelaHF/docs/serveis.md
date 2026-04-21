# PreferitsService

Servei d’Angular responsable de gestionar la col·lecció de pel·lícules preferides dins del catàleg. Implementa un model reactiu basat en signals i garanteix la persistència de dades mitjançant localStorage.

---

## Descripció general

Aquest servei encapsula tota la lògica relacionada amb:

- Emmagatzematge de preferits  
- Gestió de notes associades  
- Persistència entre sessions  
- Accés reactiu a l’estat  

Està dissenyat com un singleton global, assegurant una única font de veritat al llarg de tota l’aplicació.

---

## Responsabilitats

- Mantenir l’estat intern de preferits  
- Exposar l’estat de forma reactiva i segura  
- Gestionar la persistència en localStorage  
- Garantir la integritat de les dades  
- Evitar duplicats  
- Proporcionar operacions CRUD sobre preferits i notes  

---

## Estat i reactivitat

El servei utilitza un signal intern com a contenidor principal de l’estat.

Aquest estat:

- És privat i no accessible directament  
- Es modifica exclusivament a través de mètodes del servei  
- Es publica com a readonly per evitar mutacions externes  

A més, es disposa d’una propietat computada que permet obtenir el total de preferits de forma reactiva.

---

## Persistència

La persistència es basa en localStorage, utilitzant una clau específica per identificar les dades.

### Càrrega inicial

- Es realitza en la inicialització del servei  
- Converteix les dates serialitzades a objectes Date  
- Gestiona errors en cas de dades corruptes  

### Desat de dades

- S’executa després de cada modificació de l’estat  
- Serialitza la informació en format JSON  

---

## Gestió de preferits

### Afegir preferit

- Verifica si ja existeix per evitar duplicats  
- Inicialitza el preferit amb notes buides i data actual  
- Actualitza l’estat i desa automàticament  

### Eliminar preferit

- Elimina el preferit mitjançant filtratge per identificador  
- Actualitza l’estat i sincronitza amb la persistència  

---

## Gestió de notes

### Afegir nota

- Afegeix una nova entrada a la llista de notes del preferit  
- Manté la immutabilitat de l’estat  

### Eliminar nota

- Elimina una nota segons la seva posició  
- Evita mutacions directes sobre l’array original  

---

## Consultes

### Comprovar si és preferit

- Determina si un element existeix dins la col·lecció  

### Obtenir preferit

- Retorna un element concret a partir del seu identificador  
- Pot retornar buit si no es troba  

---

## Model de dades

Un preferit està compost per:

- Identificador de la pel·lícula  
- Nom de la pel·lícula  
- Llista de notes  
- Data d’afegit  

---

## Bones pràctiques aplicades

- Immutabilitat en totes les actualitzacions d’estat  
- Encapsulació de la lògica de persistència  
- Exposició controlada de l’estat (readonly)  
- Inicialització automàtica del servei  
- Gestió d’errors en la deserialització  
- Separació clara de responsabilitats  

---

## Casos d’ús

- Marcar i desmarcar pel·lícules com a preferides  
- Afegir anotacions personals per cada pel·lícula  
- Mostrar informació reactiva en la interfície  
- Persistir l’estat de l’usuari entre sessions  