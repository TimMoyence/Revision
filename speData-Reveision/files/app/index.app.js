import express from 'express';
import router from './routers/index.router.js';

const app = express();

// middleaware pour récupérer un body au format JSON
app.use(express.json());
// On peut donner la possibilité d'utiliser les 2 format dans la même app
app.use(express.urlencoded({ extended: true }));

app.use(router);

export default app;
