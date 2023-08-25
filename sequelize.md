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
- views 
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
            // On décide si sequelize va logger ou non les requêtes (si on ne veut pas c'est false)
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

# 3 - Controllers : exemple d'un controller et fonction d'association

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
    
    const quiz = await Quiz.findOne({
            where: { id: id },
            include: [
                { association: 'author' },
                { association: 'questions', include: ['level', 'answers'] },
                { association: 'tags' },
            ],
        });
    },
};

module.exports = questionsController;
```

**Possibilité d'associer une fonction a une association de deux ou plsuierus models :**

    Foo.hasMany(Bar)

Créer un tableau et le renvoie
- fooInstance.getBars()

Compte le nombre de nom a l'interieur du models
- fooInstance.countBars()

Renvoie true ou false en fonction de si la valeur passé en paramètre est a l'interieur ou non
- fooInstance.hasBar()
- fooInstance.hasBars()


- fooInstance.setBars()

Rajoute a l'instance foo une association indiqué en paramètre et qui est une des valeurs de bar
- fooInstance.addBar()
- fooInstance.addBars()

L'enlève
- fooInstance.removeBar()
- fooInstance.removeBars()

Créer une nouvelle valeur dans Bar et l'associe a foo 
- fooInstance.createBar()

# 4 - Views 

``` HTML 
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

# Les Middlewares

## Middleware gestion d'erreur 

- Création d'un docs nommé middleware
- Création de trois middleware pour gerer les erreur et renvoyer un message

```Js
const { catchErrors } = require('../../middlewares/errorHandlers.js');

router.get('/', catchErrors(mainController.index)); 
```  

```JS
// Middleware de l'erreur 404 (page non trouvé)
// * Il faut appeler le middleware dans index après avoir fait app.use du router
exports.notFound = (req, res, next) => {
    const error = new Error('Not found');

    error.status = 404;

    next(error);
};

// Ce middleware s'appel dans le router
// on fait une fonction qui prend une promesse en paramètre et qui exécute un middleware qui appelle la promesse (fn) qui renvoie le résultat de celle-ci ou qui attrape l'erreur pour passer au prochain middleWare .
exports.catchErrors = (fn) => {
    return (req, res, next) => {
        return fn(req, res, next).catch(next);
    };
};

// On créée un middleware d'erreurs avec 4 paramètres dont le premier est l'erreur,  dans ce middleware on créée une constante qui va récupérer le code http et renvoyer un fichier 'erreur' avec un message d'erreur.
// * le premier argument est une instance de Error
// * Il faut appeler le middleware dans index après avoir fait app.use du router
exports.showErrors = (err, req, res, next) => {
    const statusCode = err.status || 500;
    res.status(statusCode).render('error', { error: err.message });
};
```

## Middleware de gestion de la connection pour acceder a une page 

```Js
// Ce middlewaer sera ensuite appelé par app.use dans le router de la page concerné. Et permet de valider par la session si un user est présent ou non. 
const isUserConnectedMiddleware = (req, res, next) => {
    // a-t-on un user ?
    if (!req.session.user) {
        return res.redirect('/login');
    }

    next();
};

module.exports = isUserConnectedMiddleware;

```

## Middleware de gestion d'un user  

```Js
// Ce middlewaer sera ensuite appelé par app.use dans le router de la page concerné juste après session. Et permet de faire un menu responsive en fonction de si (!locals.user) vaux true ou non. 
const userMiddleware = (req, res, next) => {
    res.locals.user = false;
    if (req.session.user) {
        res.locals.user = req.session.user;
    }

    next();
};

module.exports = userMiddleware;
```

## Middleware d'accès a un page uniquement si l'on a un role défini dans le user

```Js
const adminMiddleware = (req, res, next) => {
  // a-t-on un user ?
  if (!req.session.user) {
    return res.redirect('/login');
  }
  if (req.session.user.role === 'admin') {
    return next();
  } 
  const error = new Error ('Accès refusé');
  error.status = 401;

  next(error);
};

module.exports = adminMiddleware;
```

# Les mots de passes avec bcrypt

```Js
    // On require brcypt qui sert a encrypter les mdp
    const bcrypt = require('bcrypt');
    // On require emailValidator qui est integré dans pg ? ou Sequelize ? 
    const emailValidator = require('email-validator');
    // vu que l'on fait simplement de l'envoie de donnée on a pas besoin d'avoir les associations
    const { User } = require('../models');

    const sessionController = {
        async loginAction(req, res) {
            // * Va chercher dans le post l'email et la password rentré dans la page login (necessite un post dans le router)
            const { email, password } = req.body;

            // Permet de valider l'email avec email Validator de manière explicite
            if (!emailValidator.validate(email)) {
                return res.render('login', {
                    error: 'Votre email est invalide',
                });
            }

            // Permet de valider si l'email existe dans la BDD
            const user = await User.findOne({
                where: { email: email },
            });

            // Si l'user n'est pas bon alors on renvois un message générique 
            if (!user) {
                return res.render('login', {
                    error: 'Un message générique',
                });
            }

            // ! Vérification du mot de passe
            let ok = false;
            if (user) {
                // * bcrypt récupère le salt du mot de passe user.password
                // * il ajoute ce salt au nouveau mot de passe et il chiffre tout ça
                // * Il compare les deux strings et il détermine selon un degré d'acceptabilité si les mots de passes correspondent.
                ok = await bcrypt.compare(password, user.password);
            }

            // Si user existe et que password est ok : on fait une session
            if (ok) {
                // on efface le password sur l'instance de User
                delete user.dataValues.password;
                req.session.user = user;
                return res.redirect('/');
            }

            // ! Si pas ok
            return res.render('/login', {
                error: "Un truc horrible s'est produit",
            });
        },

        logout(req, res) {
            req.session.user = false;
            // delete req.session.user;
            req.session.destroy();

            res.redirect('/');
        },
    };

module.exports = sessionController;

```