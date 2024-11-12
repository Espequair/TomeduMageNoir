# Tome du Mage Noir

Ce document est une introduction au projet sur lequel vous etes.
Il est destiné à ceux qui souhaite améliorer le site (a venir) tdmn.espequair.eu, ou à ceux qui veulent réutiliser le code pour faire leur propre outillage.
 
## TODO
- [ ] Rendre regardable
  - [ ] Récupérer les logos des éléments
  - [ ] Afficher les images depuis un serveur
- [ ] Améliorer la page de carte
- [ ] Rendre Utile la page de collection
  - [ ] Ajouter "Grouper par"
  - [ ] Ajouter "Trier par"
  - [ ] Ajouter "Séléctionner par"
    - [ ]  "Type" - Radio
    - [ ]  "Nom"  - Texte
    - [ ]  "Mana Requis" - Texte pour chaque élément


## SCRIPTS

Pour générer le json des cartes
En Python
do_everything() génère tout dans un dossier `worspace`, y compris 258Mb d'images

## BACKEND

Le moins développé pour l'instant.
Sera probablement Flask ou FastAPI, à voir
### Buts
- [ ] Servir les images
- [ ] Servir le fichier cards_catalog.json à jour

## FRONTEND

En Svelte+Sveltekit

## Organization

```mermaid
sequenceDiagram;
 actor User
 User ->> Browser: Get me the collection page
 Browser ->> Frontend: Give me the /collection page
 Frontend ->> Browser: Here is the /collection page
 Browser ->> Backend: JS in the /collection page tells me you should give me cards_catalog.json
 Backend ->> Browser: Here is the data you requested
 Browser ->> User: Here is the collection page with everything

 User ->> Browser: Get me the page for X
 Browser ->> Frontend: Give me the /card/X page
 Frontend ->> Browser: Here is the /card/X page and details for the cards
 Browser ->> Backend: JS in the /card/X page tells me you should give me the image for /card/X
 Backend ->> Browser: Here is the image you requested
 Browser ->> User: Here is the card page
```
