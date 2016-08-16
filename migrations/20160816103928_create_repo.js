
exports.up = function(knex, Promise) {
  return knex.schema.hasTable('users').then((exists) => {
    if (!exists) {
      return knex.schema.createTable('repos', (t) => {
        t.increments('id').primary();
        t.string('name').notNullable().unique();
        t.string('cron_pattern').notNullable();
        t.string('base_branch').notNullable();

        t.timestamps();
      });
    } else {
      return new Error("The table already exists");
    }
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.hasTable('users').then((exists) => {
    if (exists) {
      return knex.schema.dropTable('repos');
    }
  });
};
