import cadexService from './cadex.service.js';

const mockData = {
  names: [
    'un cheval',
    'la mairie de Neuilly-sur-Seine',
    'une huître',
  ],
  adjectives: [
    'bien cuit',
    'blond',
    'guilleret',
  ],
  verbs: [
    'consulte',
    'franchit',
    'cuisine',
  ],
  complements: [
    'un seau en plastique',
    'la consommation de café',
    'Yann',
  ],
};

// Pour créer un test untiaire, on utilise une fonction globale "test" ou "it" qui est rendu
// disponible lorsque l'on est dans un ennvironnement de test créer par Jest. L'environnement de
// test est créer au moment ou l'on utilise la commande "jest" dans le terminal.
test(
  // on fourni un libellé pour ce test, histoire de savoir ce qui fonctionne ou pas dans le rapport
  // de test
  'cadexService must be an object',
  // puis la fonction a exécuter pour ce test
  () => {
    // dans la fonction on décris à l'aide de la fonction global "expect" frouni également par
    // l'environnement de test, ce que l'on veut vérifier. Ici on vérifie que le service est bien un
    // objet.
    expect(typeof cadexService).toBe('object');
  },
);

test('cadexService must have a generate method', () => {
  // En premier lieu on va vérifier que l'objet cadexService contient une propriété nommé "generate"
  expect(cadexService.generate).toBeDefined();
  // En second lieu on va vérfier que la valeur decette propriété est une fonction
  expect(typeof cadexService.generate).toBe('function');
});

// Notre Service devra avoir une méthode setData, permettant de fournir les données à exploiter
test('cadexService must have a setData method', () => {
  expect(cadexService.setData).toBeDefined();
  expect(typeof cadexService.setData).toBe('function');
});

// On 4 partie de phrases : name, adjective, verb, complement

// On va récupérer un nom aléatoire, un adjectif aléatoire, un verbe aléatoire, et un complément
// aléatoire

// On pourrait stocker ces 4 éléments dans des variables ou un objet pour ensuite le traiter
/*
{
  name: 'une huître',
  adjective: 'blond',
  verb: 'enduit de confiture',
  complement: '2 mains gauches'
}

Mais cet objet il est pratique à utiliser dans du code, mais pas très lisible pour le quidam. On
donc devoir ajouter une méthode à cet objet afin qu'il forme une phrase avec ces mots, une sorte de
colle

{
  name: 'une huître',
  adjective: 'blond',
  verb: 'enduit de confiture',
  complement: '2 mains gauches',
  glue(){
    // colle les mots ensemble
  }
}
*/

let result;

describe('cadexService.generate', () => {
  test('must return an object', () => {
    // dans le contexte de mon fichier de test je lui fourni des données "fake" on appelle cela
    // des données simulées
    cadexService.setData(mockData);
    result = cadexService.generate();
    expect(typeof cadexService.generate()).toBe('object');
  });

  describe('property name', () => {
    test('must be present', () => {
      expect(result).toHaveProperty('name');
    });

    test('must be a string', () => {
      expect(typeof result.name).toBe('string');
    });

    test('must have a length greater than 1', () => {
      expect(result.name.length).toBeGreaterThan(1);
    });

    test('must be one of data names collection', () => {
      expect(mockData.names).toContain(result.name);
    });
  });

  describe('property adjective', () => {
    test('must be present', () => {
      expect(cadexService.generate()).toHaveProperty('adjective');
    });

    test('must be a string', () => {
      expect(typeof result.adjective).toBe('string');
    });
  });

  describe('property verb', () => {
    test('must be present', () => {
      expect(cadexService.generate()).toHaveProperty('verb');
    });

    test('must be a string', () => {
      expect(typeof result.verb).toBe('string');
    });
  });

  describe('property complement', () => {
    test('must be present', () => {
      expect(cadexService.generate()).toHaveProperty('complement');
    });

    test('must be a string', () => {
      expect(typeof result.complement).toBe('string');
    });
  });

  describe('property toString', () => {
    test('must be present', () => {
      expect(cadexService.generate()).toHaveProperty('toString');
    });

    test('must be a method', () => {
      expect(typeof result.toString).toBe('function');
    });
  });
});

// et ensuite trouver d'autre test qui serait intéressant pour les valeurs de chaque propriété

// d'ailleurs a ce propros est ce qu'il serait intéressant de récupérer l'ensemble des données afin
// de vérifier que les partie de phrase récupérées aléatoirement font bien partie de la collection
// de base ?
