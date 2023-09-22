import { Router } from 'express';
import controller from '../controllers/index.controller.js';
import validation from '../middlewares/validation.middleware.js';
import schemaPost from '../schemas/cadex.post.schema.js';
import schemaGet from '../schemas/cadex.get.schema.js';
import controllerWrapper from '../middlewares/controller.wrapper.js';
import NotFoundError from '../errors/notfound.error.js';
import errorHandler from '../middlewares/error.middleware.js';
import logger from '../helpers/logger.js';

/**
 * @typedef {object} ResponseError response error
 * @property {string} error the error string
 */

const router = Router();

// Middleware de journalisation des requêtes HTTP
router.use((req, _, next) => {
  // Enregistre les détails de la requête HTTP dans les journaux

  // req.url : L'URL de la requête
  // req.method : La méthode HTTP de la requête (GET, POST, etc.)
  // req.ip : L'adresse IP du client qui a effectué la requête
  // req.headers['user-agent'] : L'entête 'user-agent' de la requête contenant des informations sur le navigateur/client

  // logger.http() : Une fonction du logger  qui enregistre un journal de niveau 'http'
  // Elle prend en paramètre un message (dans ce cas, l'URL de la requête) et un objet JSON contenant d'autres informations

  // Enregistre un journal de niveau 'http' contenant les informations de la requête
  logger.http(req.url, { method: req.method, ip: req.ip, os: req.headers['user-agent'] });

  // Passe la requête au middleware ou à la route suivante dans la chaîne
  next();
});


router.route('/cadex')
  /**
   * GET /cadex
   * @summary Get a random cadex or a personnalized one
   * @tags Main
   * @param {string} name.query - personnalized name to generate cadex
   * @param {string} adjective.query - personnalized adjective to generate cadex
   * @param {string} verb.query - personnalized verb to generate cadex
   * @param {string} complement.query - personnalized complement to generate cadex
   * @return {ResponseCadex} 200 - success response
   * @return {ResponseError} 400 - user input error
   * @return {ResponseError} 500 - internal server error
   */
  .get(
    validation(schemaGet, 'query'),
    controllerWrapper(controller.getCadex),
  )
  /**
   * POST /cadex
   * @summary Fill sentence parts collections and get a random cadex with params
   * @tags Main
   * @param {UserInputCadex} request.body.required
   * - object with different personnailzed sentence parts
   * @return {ResponseCadex} 200 - success response
   * @return {ResponseError} 400 - user input error
   * @return {ResponseError} 500 - internal server error
   */
  .post(
    validation(schemaPost, 'body'),
    controllerWrapper(controller.postCadex),
    /*
    async (req, res, next) => {
      try {
        await controller.postCadex(req, res, next);
      } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
    */
  );

router.use((_, __, next) => {
  next(new NotFoundError('404 not found'));
});

router.use(errorHandler);

export default router;
