/*
Dans schema j'aurai : schemaGet ou schemaPost
Dans dataSource : 'query' ou 'body'
*/

// La function retourné EST le middleware
export default (schema, dataSource) => async (req, res, next) => {
  try {
    // req['query'] ou req['body']
    // equivalant à req.query ou req.body
    // La fonction validateAsync est spécifique à Joi et est utilisée pour valider des données asynchrones de manière asynchrone.
    await schema.validateAsync(req[dataSource]);
    next();
  } catch (err) {
    next(err);
  }
};
