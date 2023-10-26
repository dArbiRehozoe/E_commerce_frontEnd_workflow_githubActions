// webpack.config.js ou autre fichier de configuration de build
const dotenv = require('dotenv');

if (process.env.NODE_ENV === 'development') {
  dotenv.config({ path: '.env.development' });
} else {
  dotenv.config({ path: '.env.production' });
}

// Reste de la configuration de build
