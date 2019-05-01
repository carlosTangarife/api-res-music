const path = require('path');
const rootPath = path.normalize(__dirname + '/..');
const env = process.env.NODE_ENV || 'development';

const config = {
  development: {
    root: rootPath,
    app: {
      name: 'api-music'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/api-music-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'api-music'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/api-music-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'api-music'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/api-music-production'
  }
};

module.exports = config[env];
