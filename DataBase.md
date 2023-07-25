# BDD

## 1/ Installation postgres

## 2/ Connexion

On se connecter en tant que "postgres"
`sudo -i -u postgres`

On se retrouve avec ça : `postgres@teleporter:~$`
=> on est connectés en tant qu'utilisateur postgres sur notre machine


## 3/ On se connecte au client postgres :

`psql` : on se connecte en tant que superutilisateur pour interragir avec nos bases de données

## 4/ Créer un nouvel utilisateur pour gérer notre BDD et limiter les droits

`CREATE ROLE trombi_admin WITH LOGIN PASSWORD 'trombi_admin';` = on crée un nouvel utilisteur qui s'apelle trombi_admin et qui pourra se connecter à notre BDD avec le mot de passe "trombi_admin"

## 5/ Créer notre Base de donnée

`CREATE DATABASE trombi OWNER trombi_admin;`

## 6/ Se connecter à la db

Pour créer des tables et ajouter du contenu dans la bdatabase il faut s'y connecter :

`psql -h localhost -U trombi_admin -d trombi`

- `-h` = le serveur hote
- `-U` = le nom de l'utilisateur
- `-d` = le nom de la database

## 7/ Executer un script SQL

- on se place dans le terminal, dans le projet, là où se trouve le fichier .sql
- on précise avec l'option `-f` le chemin jusqu'au fichier .sql à executer

On peut executer un script SQL très simplement dans notre base de donnée :
`psql -U trombi_admin -d trombi -f data/create_db.sql`


Bien vérifier la création : `SELECT * FROM promo;` et `SELECT * FROM student;`

## Lexique 

# Note sur les types :
  - SERIAL : type très pratique qui gère tout seul la création d'id (racourcis prostres)
  - VARCHAR : un string (on peut préciser la taille entre () derrière. De base c'est 255)
  - TEXT : une chaine de charactère plus longue (on ne spécifie pas la taille)
  - INT : Integer (nom entier)
  - DOUBLE : nombre à virgule
  - DATE : format pour uhne date (YYYY-MM-DD)
  - DATETIME : format YYYY-MM-DD HH:MM:SS

# Info 
  - `\l` : lister nos BDD qui sont sur notre machine
  - `exit` : quitter une espace ou l'on est
  - `\du` : liste les users sur ma machine => on retrouve notre trombi_admin
  - `\d nomDeLaTable` = pour vérifier que notre table a bien été créée avec les bonnes colonnes

# Précisions :
  - `nextval('promo_id_seq'::regclass)` => incrément auto des id
  - `not null` => on peut spécifier qu'un élément ne peut pas être null