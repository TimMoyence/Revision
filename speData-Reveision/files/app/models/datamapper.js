import client from './client.js';

export default {

  async getNames() {
    const result = await client.query('SELECT * FROM "nouns"');
    return result.rows;
  },

  async getAdjectives() {
    const result = await client.query('SELECT * FROM "adjective"');
    return result.rows;
  },

  async getVerbs() {
    const result = await client.query('SELECT * FROM "verb"');
    return result.rows;
  },

  async getComplements() {
    const result = await client.query('SELECT * FROM "complement"');
    return result.rows;
  },

  /*
  {
    "names": [],
    "adjectives": []
    "verbs": [],
    "complements": []
  }
  */
  async getCollections() {
    const names = await this.getNames();
    const adjectives = await this.getAdjectives();
    const verbs = await this.getVerbs();
    const complements = await this.getComplements();

    return {
      // On n'oublie pas le map, car l'information que l'on veut c'est la chaine de caractère
      // contenu dans la colonne label. On transforme le tableau. Chaque élément objet de vient une
      // string
      /*
      on transforme

      [
        {id: 1, label: 'truc', …},
        {id: 2, label: 'machin', …},
        …
      ]

      en

      [
        'truc',
        'machin',
        …
      ]
      */
      names: names.map((row) => row.label),
      adjectives: adjectives.map((row) => row.label),
      verbs: verbs.map((row) => row.label),
      complements: complements.map((row) => row.label),
    };
  },

};
