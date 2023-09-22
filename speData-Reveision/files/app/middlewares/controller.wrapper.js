// Exporte une fonction middleware prenant un contrôleur en argument
export default (controller) => async (req, res, next) => {
  try {
    // Exécute le contrôleur (fonction de gestionnaire de route) de manière asynchrone
    await controller(req, res, next);
  } catch (err) {
    // Si une erreur se produit pendant l'exécution du contrôleur, passez l'erreur au prochain middleware (ou gestionnaire d'erreurs)
    next(err);
  }
};
