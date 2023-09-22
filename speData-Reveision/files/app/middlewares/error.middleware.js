import logger from '../helpers/logger.js';
// eslint-disable-next-line no-unused-vars
export default (err, req, res, next) => {
  switch (err.name) {
    // Cette erreur est celle que l'on a créer nous même et on connait donc son nom
    case 'NotFoundError':
      res.status(404).json({ error: err.message });
      break;
    // Cette erreur provient du module Joi, et on l'a dacouvert en forcant une erreur
    case 'ValidationError':
      res.status(400).json({ error: err.message });
      break;
    // L'erreur "error" est généra par le module pg et orrsepond donc a une une erreur de BDD. On la
    // gère de la même façon que toutes les autres erreurs non référencé, c'est à dire une erreur
    // serveur.
    case 'error':
    default:
      // Dans ce cas on rajoute un affichage du côté du serveur pour que l'on soit au courant qu'il
      // y a un souci. Et qu'il faut le régler.
      logger.error('', err);
      // LE message destiné à l'utilisateur reste vague, car ce n'est pas de sa faute.
      res.status(500).json({ error: 'Internal Server Error' });
      break;
  }
};
