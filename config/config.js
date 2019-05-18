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
    db: 'mongodb://carlos:c4r10s@clustercarlos-shard-00-00-loyt5.mongodb.net:27017,clustercarlos-shard-00-01-loyt5.mongodb.net:27017,clustercarlos-shard-00-02-loyt5.mongodb.net:27017/music?ssl=true&replicaSet=clusterCarlos-shard-0&authSource=admin&retryWrites=true',
    SECRET_TOKEN: '1 [3AW#.AMg{np7?BN!y+t:(1DH%$Bi,qvi:NBr1vr-H}=9(T|GwEszr+0mF~fV['
  },

  test: {
    root: rootPath,
    app: {
      name: 'api-music'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://carlos:c4r10s@clustercarlos-shard-00-00-loyt5.mongodb.net:27017,clustercarlos-shard-00-01-loyt5.mongodb.net:27017,clustercarlos-shard-00-02-loyt5.mongodb.net:27017/music?ssl=true&replicaSet=clusterCarlos-shard-0&authSource=admin&retryWrites=true',
    SECRET_TOKEN: '1 [3AW#.AMg{np7?BN!y+t:(1DH%$Bi,qvi:NBr1vr-H}=9(T|GwEszr+0mF~fV['
  },

  production: {
    root: rootPath,
    app: {
      name: 'api-music'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://carlos:c4r10s@clustercarlos-shard-00-00-loyt5.mongodb.net:27017,clustercarlos-shard-00-01-loyt5.mongodb.net:27017,clustercarlos-shard-00-02-loyt5.mongodb.net:27017/music?ssl=true&replicaSet=clusterCarlos-shard-0&authSource=admin&retryWrites=true',
    SECRET_TOKEN: '1 [3AW#.AMg{np7?BN!y+t:(1DH%$Bi,qvi:NBr1vr-H}=9(T|GwEszr+0mF~fV['
  }
};

module.exports = config[env];
