module.exports = {
  apps : [{
    name: 'API',
    script: 'src/main.js',

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],

  deploy : {
    production : {
      user : 'root',
      host : '120.79.192.19',
      ref  : 'origin/master',
      repo : 'git@github.com:wangtingtingdvdsv/orderWeb.git',
      path : '/wangtingting/project/test'
    }
  }
};
