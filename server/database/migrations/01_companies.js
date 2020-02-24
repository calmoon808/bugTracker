exports.up = function(knex) {
  return knex.schema.createTable("companies", table => {
    table.increments();
    table.string("name").notNullable();
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable("companies");
}