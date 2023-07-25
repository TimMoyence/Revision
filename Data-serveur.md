## installation modules npm necessaires

`npm init -y`
`npm install express ejs dotenv`

## Require et lancement serveur dans index.js

```JS
// Recupération module dotenv et configuration
const dotenv = require('dotenv').config();
// Recupération module express
const express = require('express');
const path = require("path");
// Recupération router.js
const router = require('./app/router.js')

// Recupération des views
app.set("view engine", "ejs");
app.set("views", __dirname + "/app/views");

// Recupération fichier static
app.use(express.static(path.join(__dirname + "/public")));

// Récupération de ce qui a été encodé dans un formulaire post
app.use(express.urlencoded({ extended: true }));

// Appel du Router
app.use(router);

// Lancement du serveur
            // Appel le PORT du dossier .env
app.listen(process.env.PORT, () => {
    console.log(
      `Vous êtes dans le serveur Trombinoclock sur http://localhost:${process.env.PORT}`
    );
})
```

## Fichier .env (attention a mettre le .env dans le .gitignore et créer un .envexample sans les données sensibles)
``` js 
PGUSER=trombi_admin
PGHOST=localhost
PGPASSWORD=trombi_admin
PGDATABASE=trombi
PGPORT=5432
```


## Require dans Router et lancement route

```js
const express = require('express');
// require du fichier contenant le Controller gérant la logique d'application
const mainController = require('./controllers/mainController');

const router = express.Router();
// Première route
router.get("/", mainController.getHomePage);
```

## Les controllers 
Un controller ne sert qu'a récupérer la logique de code et de fonctionnement de l'application. Pour les requete avec la base de donnée (en SQL) on utilise le dataMapper.  

```js
// Si besoin on require le data Mapper pour avoir accès a celui ci 
const dataMapper = require("../dataMapper");

const promoController = {
            // fct asynchrone
  getPromosList: async (req, res) => {
    try {
    // Permet de récupérer le resultat d'une requete SQL : 
    //             attente de réponse des data   
    //                                               posibilité de donner un param pour qu'il soit utilisé dans le dataMapper
      const promos = await dataMapper.getPromosListRequest(params);
      res.render("promos", { promos });
      // Gestion des erreurs 
    } catch (error) {
      console.trace(error); 
      res.status(404).render("404.ejs");
    }
  },
};

// Permet de récupérer l'object mainController et de le require dans le router
module.exports = promoController;
```

## Le database.js 
```js 
// FICHIER RESPONSABLE DE LA CONNEXION A LA BDD
const { Client } = require("pg");

const client = new Client();

client.connect();

module.exports = client;
```

## Le dataMapper
```js
// on Requiere le fichier database pour la connection a la BDD
const client = require("./database");


```