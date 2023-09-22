// Importe le chargement des variables d'environnement depuis './app/helpers/env.load.js'.
import './app/helpers/env.load.js';

// Importe la fonction `createServer` de la bibliothèque native 'node:http'.
import { createServer } from 'node:http';

// Importe l'application Express.js depuis './app/index.app.js'.
import app from './app/index.app.js';

// Importe la fonction `userDocImplementation` depuis './app/middlewares/swagger.doc.js'.
import userDocImplementation from './app/middlewares/swagger.doc.js';

// Configure la documentation Swagger pour l'application.
userDocImplementation(app);

// Crée un serveur web en utilisant l'application Express.js comme gestionnaire de requêtes.
const server = createServer(app);

// Définit le port sur lequel le serveur écoutera, en utilisant la valeur de l'environnement 'PORT' ou 3000 par défaut.
const PORT = process.env.PORT || 3000;

// Démarre le serveur en écoutant sur le port spécifié.
server.listen(PORT, () => console.log(`Server launched on http://localhost:${PORT}`));
