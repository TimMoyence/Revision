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

