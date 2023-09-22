// ! Function With Comment 

import winston from 'winston';

const createCustomLogger = () => {
  // Importation des fonctionnalités de Winston
  const {
    combine,
    json,
    timestamp,
    colorize,
    printf,
  } = winston.format;

  // Création du logger Winston avec sa configuration
  const logger = winston.createLogger({
    level: 'http', // Niveau de journalisation minimal (http ou supérieur)

    // Format des journaux : timestamp + format JSON
    format: combine(
      timestamp(),
      json(),
    ),

    // Métadonnées par défaut à inclure dans chaque journal
    defaultMeta: { service: 'cadex' },

    // Destinations de sortie des journaux (fichiers)
    transports: [
      new winston.transports.File({
        filename: 'logs/error.log', // Fichier pour les erreurs
        level: 'error', // Niveau "error"
      }),
      new winston.transports.File({
        filename: 'logs/combined.log', // Fichier combiné
        level: 'http', // Niveau "http"
      }),
    ],
  });

  // Format personnalisé pour les journaux d'erreur affichés dans la console
    const consoleErrorFormat = printf(({
    // eslint-disable-next-line no-shadow
    level, timestamp, name, stack,
    }) => `[${timestamp}] ${level}(${name}) - ${stack}`);



  // Format personnalisé pour les journaux de niveau "http" affichés dans la console
    const consoleHttpFormat = printf(({
    // eslint-disable-next-line no-shadow
    level, timestamp, message, method, ip, os,
    }) => `[${timestamp}] ${level} - ${ip} ${os} ${method} ${message}`);

  // Ajout des transports de console en mode développement
  if (process.env.NODE_ENV !== 'production') {
    // Transport pour les journaux d'erreur en console
    logger.add(new winston.transports.Console({
      level: 'error', // Niveau "error"
      format: combine(
        colorize({ all: true }), // Colorisation des journaux
        timestamp({ format: 'YYYY-MM-DD HH:ss' }), // Format d'horodatage
        consoleErrorFormat, // Utilisation du format personnalisé
      ),
    }));

    // Transport pour les journaux de niveau "http" en console
    logger.add(new winston.transports.Console({
      level: 'http', // Niveau "http"
      format: combine(
        colorize({ all: true }), // Colorisation des journaux
        timestamp({ format: 'YYYY-MM-DD HH:ss' }), // Format d'horodatage
        consoleHttpFormat, // Utilisation du format personnalisé
      ),
    }));
  }

  return logger;
};

export default createCustomLogger;


// ! Functon Whithout Comment :
/*
import winston from 'winston';

const {
  combine,
  json,
  timestamp,
  colorize,
  printf,
} = winston.format;

const logger = winston.createLogger({
  level: 'http',
  format: combine(
    timestamp(),
    json(),
  ),
  defaultMeta: { service: 'cadex' },
  transports: [
    new winston.transports.File({
      // On oublie de rajouter le repertoire logs dans le gitignore
      filename: 'logs/error.log',
      level: 'error',
    }),
    new winston.transports.File({
      filename: 'logs/combined.log',
      level: 'http',
    }),
  ],
});

const consoleErrorFormat = printf(({
  // eslint-disable-next-line no-shadow
  level, timestamp, name, stack,
}) => `[${timestamp}] ${level}(${name}) - ${stack}`);

const consoleHttpFormat = printf(({
  // eslint-disable-next-line no-shadow
  level, timestamp, message, method, ip, os,
}) => `[${timestamp}] ${level} - ${ip} ${os} ${method} ${message}`);

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    level: 'error',
    format: combine(
      colorize({ all: true }),
      timestamp({ format: 'YYYY-MM-DD HH:ss' }),
      consoleErrorFormat,
    ),
  }));
  logger.add(new winston.transports.Console({
    level: 'http',
    format: combine(
      colorize({ all: true }),
      timestamp({ format: 'YYYY-MM-DD HH:ss' }),
      consoleHttpFormat,
    ),
  }));
}

export default logger;
*/