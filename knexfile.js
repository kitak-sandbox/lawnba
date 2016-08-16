module.exports = {

  development: {
    client: 'mysql',
    connection: {
      database: 'lawnba_development',
      user:     process.env['DB_USER'],
      password: process.env['DB_PASSWORD']
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  staging: {
    client: 'mysql',
    connection: {
      database: 'lawnba_staging',
      user:     process.env['DB_USER'],
      password: process.env['DB_PASSWORD']
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'mysql',
    connection: {
      database: 'lawnba_production',
      user:     process.env['DB_USER'],
      password: process.env['DB_PASSWORD']
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
