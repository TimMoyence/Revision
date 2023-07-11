# Lancement de express dans la console : 
    - npm init -y
    - npm install express

# A mettre dans le script.js
```Javascript
    var express = require("express");
    var app = express();
```

# Lancement d'un serveur
```Javascript
// Sur quels port on écoute
    const port = "3000";

// Lancement de app.get qui lance l'acouteur d'événement par express 
    app.get("/", (req,res) => {
        res.sendFile(`${__dirname}/views/index.html`);
    });

// Lancement de l'écoute par le biais du port défini plus haut et console.log pour avoir accès au port
// A mettre a la fin
    app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`); 
    });
```

# Les fonctions res 

- res.SendFile => permet de récupérer un fichier venant d'un autre dossier HTML / CSS ou autre en lui affichant son chemin

- __dirname => affiche le chemin courant jusqu'a au dossier dans lequel les fichier est 

- req.params.id => 

# EJS 
L'installation de ejs
  - npm install ejs

Mise en place de la récupération des view 
```js 
//Pour le premier, on précise ici que le dossier qui contient les vues (les views) sera le dossier ./views (il faut que ce dossier existe).
  app.set("view engine", "ejs");
//Pour second on lui précise le nom du moteur que nous allons utiliser, il sera capable d’aller chercher le module EJS tout seul.
  app.set("views", "views");
```
la récuparation du html 
  - res.render dans le app.get
    ```js
    app.get ("/url", (req,res) => {
        res.render ("le nom du fichier qui est dans view"{
            "ce que l'on veut récupérer et qui sera utilisé dans le template"
        })
    });
    ```

# Les partials 

=> création d'un dossier partials dans le dossier view. 
Les partials permettent de mettre a disposition des morceaux de cotes reutilisé dans plusieurs page ex : le header et le footer

**A mettre dans le partials**
ex : ```html
 <footer>
    <small>O'Recipes - 2022 - Tous droits réservés à la gourmandise</small>
  </footer>
   </body>
</html>
```

**A mettre dans le fichier qui servira dans les pages (les autres templates ejs)**
    => pour le header
        <%- include('partials/head') %>
    => pour le footer
        <%- include('partials/foot') %> 



# root ??? dans sendFile


# middleware -> express.static
  - après le view engine : 
    ```js 
    // Tous le contenu du dossier public pourra etre servi si une requete le demande
    app.use(express.static('public')); 
    ```
  - Conditions : l'avoir intégré dans le link du header avant et l'avoir mis dans le partials donc dans tous les documents
  
# app.locales
```Js  
app.locals.siteName = "- O'Recipes - ";
// On peu mettre mane siteName partout dans n'importe quels view. Peut servire pour un nom, une années ou autres.. 
```