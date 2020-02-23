exports.up = function(knex, Promise) {
  return knex.schema.createTable("companies", table => {
    table.increments();
    table.string("name").notNullable();
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("companies");
}