// Définition de la classe NotFoundError
export default class NotFoundError extends Error {
  constructor(message) {
    // Appelle le constructeur de la classe mère "Error" avec un message d'erreur
    super(message);

    // Définit le nom de l'erreur (peut être utile pour l'identification)
    this.name = 'NotFoundError';
  }
}
