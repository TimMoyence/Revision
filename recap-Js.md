**indexOf()**

```js
//    Permet de récupérer le premier index d’un élément dans une chaîne de caractères
"fruits".indexOf("i"); // => 3 (index 3 de la chaîne)
//ou
const fruits = ["banane", "clémentine", "orange"];
fruits.indexOf("orange"); // => 2 (index 2 du tableau fruits, ie. 3ème élément)
```

**Array**

```js
// déclarer un tableau :
const fruits = ["cerise", "banane", "kiwi"];

// accéder à un élément du tableau avec la syntaxe [index] :
fruits[0]; // => accède à "cerise"
```

**Recupération du premier objet d'un tableau**
```js
const nomRecherché = FichierSource.find((UnObjetDansSource) => {
    return req.params.URL === UnObjetDansSource.name.toLowerCase();
  });
  
```
**Objets**

```js
// déclarer un objet :
const fruits = {
  superbon: "cerise",
  sucre: "banane",
  acide: "kiwi",
};

// Lire une valeur :
fruits["acide"]; // retourne "kiwi"
// syntaxe alternative, résultat équivalent :
fruits.acide;
```

**function**

```js
// Code fonctionnel
function sum(a, b) {
  return a + b;
}

const result = sum(41, 1);
console.log("La réponse de l'univers est :" + result); // affiche "Le résultat est : 42"
```

**Boucles**

```js
**For**

    for(let i = 0; i < 3; i++) {
    // ... instructions
    }

**For..in**
    const fruit = {
        nom: 'fraise',
        couleur: 'rouge'
    };

    for(let propriete in fruit) {
        console.log('Propriété ' + propriete + ' :');
        console.log('Le fruit est ' + fruit[propriete]);
    }

    // Affichage obtenu en console :
    //
    // Propriété nom :
    // Le fruit est fraise
    // Propriété couleur :
    // Le fruit est rouge

**For..of**
    const winners = [
        {name: 'Christian Taylor', distance: 17.86},
        {name: 'Will Claye', distance: 17.76},
        {name: 'Dong Bin', distance: 17.58}
    ];

    console.log('Podium du triple saut hommes, Rio 2016');

    for(let athlete of winners) {
        console.log(athlete.name + " avec " + athlete.distance + "m");
    }

    // Affichage obtenu en console :
    //
    // Podium du triple saut hommes, Rio 2016
    // Christian Taylor avec 17.86m
    // Will Claye avec 17.76m
    // Dong Bin avec 17.58m

    // ! NB : la boucle for...of ne fonctionne pas avec les objets.

**forEach**
    // forEach est une méthode des Arrau qui permet d'exécuter le même traitement sur chacun des éléments d'un tableau
    // Le traitement à exécuter est défini par une fonction
    starElements.forEach(function (starElement){
      // quand :
      // - un click se produit,
      // - sur l'élément contenu référencé par la variable starElement,
      // - la fonction oNote.handleStarClick sera exécuté
      // Le lien entre ces trois choses est fait par la méthode addEventListener
      starElement.addEventListener('click', oNote.handleStarClick);
    });

```

**If..else**

```js
function testNum(a) {
  if (a > 0) {
    result = "positive";
  } else {
    result = "NOT positive";
  }
  return result;
}
```

**Récupérer un élément HTML**

```js
let elementChapeau = document.getElementById("chapeau");

let elementChapeau = document.querySelector("#chapeau");

let elements = document.querySelectorAll("#chapeau, .introduction");
//elements vaut NodeList [ <p.introduction>, <div#chapeau> ]

let introduction = elements[0]; // <p.introduction>
let chapeau = elements[1]; // <div#chapeau>
```

**Modifier un élément du DOM**

```js
//Ajouter du contenu texte
element.textContent = "Hello!";
//Ajouter du contenu HTML
element.innerHTML = "<strong>Hello!</strong>";
```

**Modifier les attributs d’un élément**

```js
// Récupérer l'élément...
let element = document.getElementById("link");

// ...puis ajouter des attributs
element.id = "link-contact";
element.href = "https://oclock.io";
element.className = "navigation-link";
```

**Créer un élément + ajouter au DOM**

```js
// Création
let item = document.createElement("li");
// Élément du DOM
let list = document.querySelector("ul");
// Ajout de l'élément au DOM
list.appendChild(item);
```

**Event**

```js
    // event : 'click', 'submit', 'keyup', 'DOMContentLoaded'...
    // handler : fonction exécutée quand l'événement survient
        element.addEventListener(type, handler);

    //Exemple pour enlever une classe
        handleHideClick() {
            newsletter.closeBtn.addEventListener('click', newsletter.hideContainer);
        },

        hideContainer() {
            newsletter.container.classList.add('newsletter--hidden');
        },

    // Exemple au click -> ajour d'une fct pour montrer un pop up
        handleShowClick() {
            newsletter.openLink.addEventListener('click', (event) => {
                event.preventDefault();
                newsletter.showContainer();
            });
        },

    // Exemple pour un scrool de 300 (paramétré par maxDistanceFromTop (cf rangement d'un objet))
        handleScroll() {
            document.addEventListener('scroll', function() {
                // * window.scrollY : retourne le nombre de pixel depuis le top 0
                if(window.scrollY >= newsletter.maxDistanceFromTop) {
                    newsletter.showContainer();
                }
            });
        },
```

**Event Formulaire - prevent default**

```js
    TakeForm() {
        addEventListener('submit', function(evt) {
            evt.preventDefault(); // empêche le rechargement automatique de la page
            // le code peut s'exécuter maintenant...
    });
    }
```

**toggle**

```js
let nom = document.querySelector("Ou il y aura le click");
nom.addEventListener("click", function (event) {
  const elem = event.target;
  // ! Attention, si la classe n'existe pas en css, toggle ne produit pas d'erreurs
  elem.classList.toggle("la classe a ajoute / enlever");
});
```

**Rangement dans un objet**

```js
    // tout mettre dans une constante
        const app = {
    // En haut toute les valeurs de recupération dans le dom ou valeur integré a une fonction
        container: document.querySelector('.newsletter'),
        openLink: document.querySelector('.icon-mail').parentElement,
        maxDistanceFromTop: 300,
    // Faire des fonctions avec le moins d'actions a l'interieur
        hideContainer() {
            newsletter.container.classList.add('newsletter--hidden');
        },
    // pour initialiser les fonctions
        init() {
            newsletter.hideContainer();
            newsletter.handleScroll();
        },
    //Permet de lancer l'initialisation après le lancement du DOM
        document.addEventListener('DOMContentLoaded', newsletter.init);
};
```

**Recuperation fin d'un email pour comparatif a un 'ForbiddenDomains'**

```js
 handleEmailInput() {
        const input = document.getElementById('subscriber-email');

        input.addEventListener('change', (event) => {
            const email = event.target.value;
            const emailPart = email.substring(email.indexOf('@'));

            if (newsletter.forbiddenDomains.includes(emailPart)) {
                alert(newsletter.forbiddenDomainMessage);
            }
        });
    },
```

**backticks ``**

```js
const character = {
  name: "Toto",
  job: "Humorist",
};

console.log(`${character.name} is a ${character.job}.`);
// => affiche "Toto is a Humorist." en console
```
