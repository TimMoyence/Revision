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

// on ajoute un body-parser pour avoir accès à "request.body" dans les controlleurs
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

```js
PGUSER = trombi_admin;
PGHOST = localhost;
PGPASSWORD = trombi_admin;
PGDATABASE = trombi;
PGPORT = 5432;
```

## Gestion des cookies : Installation express-session et gestion

```js
`npm install express-session`;
// a mettre avec les autres require
const session = require("express-session");

// on configure exress-session (DOC: https://www.npmjs.com/package/express-session)
app.use(
  session({
    secret: "une chaine de caractère aléatoire", // sert à générer une identifiant unique de session
    resave: true, // sauvegarde automatiquement la session à la fin de chaque requête
    saveUninitialized: true, // créer une session pour l'internaute dans tous les cas, même si elle est vide
    cookie: {
      // des options pour les cookies
      secure: false, // true si on est en HTTPS
    },
  })
);
```

## Require dans Router et lancement route

```js
const express = require("express");
// require du fichier contenant le Controller gérant la logique d'application
const mainController = require("./controllers/mainController");

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

const dataMapper = {
  // cas simple
  //                        params que l'on mets a dispo dans le controllers
  getPromoByIdRequest: async (promoId) => {
    const sqlQuery = `SELECT * FROM promo WHERE id=${promoId};`;
    const result = await client.query(sqlQuery);

    // on gère le cas où la db retourne un tableau vide (pas de promo trouvée avec cet id)
    if (result.rows.length === 0) {
      return null;
    }
    // result.rows est un tablea
    // donc on peut affiner encore notre objet promo et accéder au premier (et unique) élément du tableau grâce à la notation [0]
    return result.rows[0];
  },

  // cas complexe avec notation préparé : Doc : https://node-postgres.com/features/queries#query-config-object
  // méthode pour insérer un étudiant dans la db
  addStudentRequest: async (student) => {
    // Ici on fait du destructuring : on "ouvre" l'objet (student) et on crée une constante pour chacune de ses propriétés
    // grâce à ça, ci dessous on peut utiliser dirrectement "first_name" au lieu de "student.first_name"
    const { first_name, last_name, github_username, promo } = student;
    // (je prépare en amont l'url de la phot de profil Github)
    const profile_picture_url = `https://github.com/${github_username}.png`;
    const sqlQuery = {
      text: `
                INSERT INTO student (
                    "first_name", 
                    "last_name", 
                    "github_username", 
                    "profile_picture_url", 
                    "promo_id"
                )
                VALUES ($1, $2, $3, $4, $5);
            `, // pas de guillemets autour des $ : c'est pg qui les rajoute au moment d'interpréter la string
      values: [
        first_name,
        last_name,
        github_username,
        profile_picture_url,
        promo,
      ],
    };
    // intérêt des requêtes préparées : éviter les injections SQL. La partie variable (ce qui est entré dans le formulaire) est intéprété comme une string par PG et non comme du SQL.
    // Ainsi un utilisateur malveillant ne peut pas injecter du SQL et casser ma db !
    const result = await client.query(sqlQuery);
    // rowCount : le nombre de lignes qui ont été insérées dans la db
    //=> permet de gérer l'erreur avec un if (rowCount === 1) et rediriger vers la views dans le controller
    return result.rowCount;
  },
};
```
