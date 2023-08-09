## Fichier .env pour connection BDD

```JS
// * String de connexion pour première version de fonction de connexion à sequelize
PG_URL=postgres://oquiz:oquiz@localhost/oquiz

DB_NAME=oquiz
DB_USERNAME=oquiz
DB_PASSWORD=oquiz
DB_HOST=localhost
DB_ENV=postgres
```

## NPM install et config package.json 

` npm install dotenv ejs express pg sequelize `

Dans le "scripts" mettre : 
```JS
"start": "node index.js",
"dev": "nodemon index.js",
```

## Architecture : MVC

Donc le doc création d'un dossier : 
- controllers
- database (pour connection avec la base de données)
- models
- vieux 
- Fichier router
  
## database => connection.js

```JS
const Sequelize = require('sequelize');

function getConnexion() {
    // on doit retourner une instance de sequelize car les modèles en ont besoin
    // Les 3 premiers args sont le nom de la BDD, le USERNAME de la BDD, le mot de passe de USERNAME
    return new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USERNAME,
        process.env.DB_PASSWORD,
        {
            // On dit a sequelize ou se trouve la base de données : ça peut être un nom de domaine
            host: process.env.DB_HOST,
            // On précise le type de serveur de BDD utilisé : postgres
            dialect: process.env.DB_ENV,
            // On annule l'utilisation du camelCase au profit du snake_case
            define: {
                underscored: true,
                createdAt: 'created_at',
                updatedAt: 'updated_at',
            },
            // On décide si sequelize va logger ou non les requêtes
            logging: console.log,
        }
    );
}

module.exports = getConnexion;
```

## Methodo : 

1. Creation des class pour chaque partie de la BDD
2. Creation d'un fichier index.js avec les associations
3. Creation des controllers et appel de la BDD 
4. Utilisation des resultats du controllers dans les views 

# 1 - Exemple d'une class

```Js
const { Model, DataTypes } = require('sequelize');
const getConnexion = require('../database/connexion');

class Question extends Model {}

Question.init(
    {
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        anecdote: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        wiki: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        level_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        answer_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        quiz_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize: getConnexion(),
        tableName: 'question',
        modelName: 'Question',
    }
);

module.exports = Question;
```

# 2 - Fichier Index : exemples associations 

```JS 
const Answer = require('./answer');
const Level = require('./level');
const Question = require('./question');

// Level & Question : One-to-Many 1,N
Level.hasMany(Question, {
    foreignKey: 'level_id',
    // alias : on va s'en servir pour faire des requêtes
    as: 'questions',
});

Question.belongsTo(Level, {
    foreignKey: 'level_id',
    as: 'level',
});

// Question & Answer : One-To-One, One-To-Many and Many-To-Many.
Question.hasMany(Answer, {
    foreignKey: 'question_id',
    as: 'answers',
});

Answer.belongsTo(Question, {
    foreignKey: 'question_id',
    as: 'question',
});

// Quiz & Question : One-To-One, One-To-Many and Many-To-Many ?
Quiz.hasMany(Question, {
    foreignKey: 'quiz_id',
    // as: 'all_questions',
    as: 'questions',
});

Question.belongsTo(Quiz, {
    foreignKey: 'quiz_id',
    as: 'quiz',
});

module.exports = { Answer, Level, Question };
```

# 3 - Controllers : exemple d'un controller 

```JS 
const {Questions} = require("../models");
const {Level} = require("../models");

const questionsController = {
    async index (_,res) {
        try {
        // Appel toutes les questions et les rend dans la constantes questions    
          const questions = await Questions.findAll();
        // Appel la questions avecl'ID 3 et ne rend que la description et id   
        const questionIdThree = await Questions.findByPk(3, {attributes : ['description', 'id']})
        
        // Appel toutes les questions et inclu la table associé par le doc index.js dans le models. Permet donc de rendre le level associé a la table.  
        const questionWithLevels = await Questions.findAll({
            include: "level",
        });

        res.render("questions", { questionWithLevels });
        } catch (error) {
          console.log(error.message);
          console.log(error.stack);
          throw error;
        }
    },
};

module.exports = questionsController;
```

# 4 - Views 

``` EJS 
<%- include('partials/head') %>

<h1>Oquiz Questions</h1>

<ul>
<% if (locals.questionWithLevels && locals.questionWithLevels.length) { %>
        <% questionWithLevels.forEach(questionWithLevel => { %>

        <!-- Attention a bien mettre plein de . pour acceder au object dans l'object -->

            <li>Niveaux de la question : <%= questionWithLevel.level.name %></li>
            <li><%= questionWithLevel.description %></li>
        <% }) %>
    <% } %>
</ul>    

<%- include('partials/foot') %>
```