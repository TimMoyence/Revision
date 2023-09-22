# app

## Controllers
### Gère la logique métier et les interactions entre les données et les vues

## errors 
#### Permet de creer une classe NotFoundError qui est extends de Errors et renvois en nom 'NotFoundError'
- file : [notfound.error.js](files/app/errors/notfound.error.js)

## helpers
  - file : **env.load.js** Permet l'utilisation du fichier .env permettant la config du PORT et de DATABASE_URL (utilisé dans models/client.js)
```js
import dotenv from 'dotenv';
dotenv.config();
```
  - file [logger.js](files/app/helpers/logger.js) permet l'utilisation et le paramétrage de [winston](https://github.com/winstonjs/winston) permet de logger nos erreurs pendant le dev et de les enregistrer dans un fichier pendant la prod et la duré de vie du site

## middlewares 

- file : [controller.wrapper.js](files/app/middlewares/controller.wrapper.js) S'intègre dans le router avant chaque controller pour les insérer dans un try / catch
- file : [error.middleware.js](files/app/middlewares/error.middleware.js) Traite les erreurs, sera donc appelé comme le dernier middleware du router (router.use(errorHandler))
- file : [swagger.doc.js](files/app/middlewares/swagger.doc.js) Permet de paramétrer **express-jsdoc-swagger** qui sert a faire de la documentation pour API
- file : [validation.middleware.js](files/app/middlewares/validation.middleware.js) Permet de declencher le schema correspondant a une route, donc de verouiller un envoie de donnée qui est correspondant uniquement a ce que l'on attend.

## models 

- file : [client.js](files/app/models/client.js) Permet la connection a la database grace à pg
- file : [datamapper.js](files/app/models/datamapper.js) Permet de faire les requetes SQL et de renvoyer les données necessaires pour le traitement en controllers (le datamapper et un ORM)

## routers

- file : [index.router.js](files/app/routers/index.router.js) Il servira pour les appelles des routes

## schemas

- file : [schemas](files/app/schemas/cadex.post.schema.js) Permet de créer un object de comparaison pour que les données qui sont envoyé en post, ou les données envoyés en get (dans l'url). Cette fonction est passé en paramètre dans la route pour être rendu disponible dans le middleware de validation, on lui passe également en paramètre la requete (query ou post) permettant de donner a la fonction ValidateAsync (native de de la bibliothèque JOI) ce qu'elle doit récuperer

## services
#### Isolation de la logique métier : Les services sont utilisés pour isoler et encapsuler la logique qui traite les données, effectue des opérations complexes, communique avec la base de données, ou interagit avec d'autres services ou API externes 
#### Réutilisation du code : réutiliser ces services dans différentes parties de l'application : exemple, un service d'authentification peut être utilisé à la fois pour l'authentification des utilisateurs lors de la connexion et pour l'authentification des appels API sécurisés.
#### Séparation des préoccupations : maintenir la séparation des préoccupations dans votre application : composants qui gèrent la logique métier ne sont pas mélangés avec la logique de gestion des routes, de la validation des données, ou de la présentation des données = code plus propre, plus lisible et plus facile à maintenir.

- file : [cadex.service.js](files/app/servies/cadex.service.js) Permet d'effectuer l'opération de création de la phrase avec des nombre random
- file : [cadex.service.js](files/app/servies/cadex.service.js) Permet de réaliser les Tests unitaires de l'application et savoir si elle peut etre mise en production. 1 actions = au moins un test

### fichier index.app.js

- file : [index.app.js](files/app/index.app.js) Simple passage pour lancer le router, lancer express, la gestion des formats .json et du req.bopdy

# Racine

### fichier index.js 

- file : [index.js](files/index.js) l'index.js ne servira qu'a implémenter le serveur web

### fichier test avec REST

- file : [test.rest.http](files/test.rest.http) Sert a lancer les tests d'appel de route coté back