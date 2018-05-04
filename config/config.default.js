'use strict';
module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = '_1525055330801_8356';

  // add your config here
  config.middleware = [];

  config.security = {
    xframe: {
      enable: false,
    },
    csrf: {
      enable: false
    }
  }

  config.cors = {
    origin: 'http://localhost:7002',
    credentials: true,
    methods: 'GET,HEAD,PUT,OPTIONS,POST,DELETE,PATCH'
  };

  config.mongoose={
    client: {
      url:'mongodb://127.0.0.1/zhufengblog'
    }
  }

  config.jwt = {
    secret: 'zfpx',
    expiresIn: '30m',
    enable:false
  };
  
  exports.multipart = {
    fileSize: '50mb',
  };

  return config;
};
