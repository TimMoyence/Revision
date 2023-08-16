# Heritage : L’héritage de classe est un moyen pour une classe d’étendre une autre classe.

```JS
class Animal {
  constructor(name) {
    this.speed = 0;
    this.name = name;
  }
  run(speed) {
    this.speed = speed;
    alert(`${this.name} runs with speed ${this.speed}.`);
  }
  stop() {
    this.speed = 0;
    alert(`${this.name} stands still.`);
  }
}

let animal = new Animal("My animal");

class Rabbit extends Animal {
  hide() {
    alert(`${this.name} hides!`);
  }
}

let rabbit = new Rabbit("White Rabbit");

rabbit.run(5); // White Rabbit court à la vitesse 5.
rabbit.hide(); // White Rabbit se cache!
```

# Instance : test with instance of

L'opérateur instanceof permet de tester si un objet possède, dans sa chaîne de prototype, la propriété prototype d'un certain constructeur.

```JS
function C() {} // Définition du constructeur
function D() {} // Définition d'un autre constructeur

var o = new C();

// true, car : Object.getPrototypeOf(o) === C.prototype
o instanceof C;

// false, car D.prototype n'existe pas dans la chaîne de prototype de o
o instanceof D;

o instanceof Object; // true, car:
C.prototype instanceof Object; // true

C.prototype = {};
var o2 = new C();

o2 instanceof C; // true

// false, car C.prototype n'existe plus dans la chaîne de prototype de o
o instanceof C;

D.prototype = new C(); // Utilisation de l'héritage
var o3 = new D();
o3 instanceof D; // true
o3 instanceof C; // true car C.prototype fait partie de la chaîne de o3
```


# accesseur / getter (get): La syntaxe get permet de lier une propriété d'un objet à une fonction qui sera appelée lorsqu'on accédera à la propriété.

```JS
const obj = {
  log: ['a', 'b', 'c'],
  get latest() {
    return this.log[this.log.length - 1];
  },
};

console.log(obj.latest);
// Expected output: "c"
```


# Methode super dans constructeur : super pour invoquer une méthode redéfinie de la superclasse
```JS
class A {

  void faire(){
      ...
    }
}

class B extends A {

  void faire() {
	super.faire();
      	...
    }

  void pourquoiPas() { 	
      	...
      	super.faire();
      	...
	faire(); // autrement dit : this.faire();

   }
}
```

# Mutateur / setter (set) : La syntaxe set permet de lier une propriété d'un objet à une fonction qui sera appelée à chaque tentative de modification de cette propriété.


```JS
const language = {
  set current(name) {
    this.log.push(name);
  },
  log: [],
};

language.current = 'EN';
language.current = 'FA';

console.log(language.log);
// Expected output: Array ["EN", "FA"]
```

# constructeur :

```JS

```


# Regex :

```JS

```