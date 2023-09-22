/**
 * Fetch a random integer from integer interval
 * @param {number} min the minimum integer for the random interval
 * @param {number} max the maximum integer for the random interval
 * @returns {number} the random integer
 */
function getRandomInt(min, max) {
  const minRounded = Math.ceil(min);
  const maxRounded = Math.floor(max);
  return Math.floor(Math.random() * (maxRounded - minRounded) + minRounded);
}

/**
 * Fetch a random item from a collection
 * @param {*[]} collection a collection of any value type
 * @returns {*} an item of any value type from the collection
 */
function getRandomItem(collection) {
  const randomIndex = getRandomInt(0, collection.length);
  const randomItem = collection[randomIndex];
  return randomItem;
}

export default {

  /**
   * @typedef {object} PartsCollections Data Object to generate cadex
   * @property {string[]} names Nouns collection
   * @property {string[]} adjectives Adjectives collection
   * @property {string[]} verbs Verbs collection
   * @property {string[]} complements Complements collection
   */

  /**
   * Record data into cadexService object
   * @param {PartsCollections} data object with properties : names, adjectives, verbs, complements
   */
  setData(data) {
    this.data = data;
  },

  /**
   * @typedef {object} CadexObject Cadex object with methods
   * @property {string} name Random noun
   * @property {string} adjective Random adjective
   * @property {string} verb Random verb
   * @property {string} complement Random complement
   * @method toString Transform object to string
  */

  /**
   * @typedef {object} UserInputCadex Cadex object with methods
   * @property {string} name Random noun
   * @property {string} adjective Random adjective
   * @property {string} verb Random verb
   * @property {string} complement Random complement
  */

  /**
   * @typedef {object} ResponseCadex Cadex object with methods
   * @property {string} cadex Random generated cadex
  */

  /**
   * Method to generate a random Cadex
   * @returns {CadexObject}
   */
  generate() {
    const name = getRandomItem(this.data.names);
    const adjective = getRandomItem(this.data.adjectives);
    const verb = getRandomItem(this.data.verbs);
    const complement = getRandomItem(this.data.complements);

    return {
      name,
      adjective,
      verb,
      complement,
      /**
       * Method to generate a string from the current object
       * @returns {string} Random Cadex
       */
      toString() {
        return [this.name, this.adjective, this.verb, this.complement].join(' ');
      },
    };
  },

};
