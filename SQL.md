### Un script SQL = une liste d'inscrutions SQL, séparées par des `;`

***

## Note : doubles quotes pas obligatoires (la plupart du temps !)

Si on a une tableu User : `SELECT * FROM user` => ne marche pas car user est une mot réservé en SQL.
Il faudra donc écrire `SELECT * FROM "user"`

Liste des noms réservés : https://sqlpro.developpez.com/cours/motsreserves/

Attention : différent des simples quotes, qui sont pour les chaines de caractère. 

***

## Aide mémoire requete 

| Requete | signification | 
|---|---|
| `SELECT *` | => Sélection des colonnes|/|
| `FROM table`  | => Nom d'une ou plusieurs tables|/|
| `WHERE condition`  | => Obtenir les résultats selon la condition|/|
| `GROUP BY expression`  | => Grouper les tables en groupe |/|
| `HAVING condition` | => Condition sur un groupe|/|
| `ORDER BY expression`  | => Trier les résultats|/|
| `DELETE FROM`  | => Supprimer un enregistrement|/|
| `INSERT INTO tableName VALUES ('valeur 1', 'valeur 2', ..)`  | => Insérer un enregistrement|/|
| `WHERE condition`  | => table WHERE condition|/|


## Examples : 

- toutes les promos, dans l'ordre alphabétique

`SELECT * FROM "promo" ORDER BY "name";`

- tous les étudiants, dans l'ordre alphabétique des noms de famille

`SELECT "first_name", "last_name" FROM "student" ORDER BY "last_name";`

- tous les étudiants de la promo 135

`SELECT * FROM "student" WHERE "promo_id"=135;`

- les étudiants dont le nom ou le prénom ressemble à "max"

```sql

SELECT first_name, last_name 
FROM student 
WHERE first_name ILIKE '%max%' 
OR last_name ILIKE '%max%';

```

`%max%` => aaamaxbbb
`%max` => aaamax


- Insérer dans la table "student" un étudiant qui s'appelle "Chuck Norris" appartenant à la promo 5
  
```sql
INSERT INTO student ("first_name", "last_name", "promo_id")
VALUES ('Chuck', 'Norris', 5);
```

Pour vérifier, plusieurs solutions :

`SELECT * FROM student WHERE first_name='Chuck';`
`SELECT * FROM student ORDER BY id DESC;`


- Insérer dans la table "promo" une promo qui s'appelle "César" et ne possède pas de `github_organisation`
    - il faut spécifier un id (la colonne id a une contrainte `not-null`)

```sql
INSERT INTO promo ("name", "id")
VALUES ('César', '675');
```

- Mettre à jour la promo 5 pour la renommer "Cleo"

```sql
UPDATE promo
SET name='Cleo'
WHERE id=5;
```
On précise bien le WHERE sinon ça midifie TOUTES les promos !

- Supprimer la promo 123 avec tous ces étudiants

`DELETE FROM student WHERE promo_id=123;`

`DELETE FROM promo WHERE id=123;`
