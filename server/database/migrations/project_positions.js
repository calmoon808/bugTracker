exports.up = function(knex, Promise) {
  return knex.schema.createTable("project_positions", table => {
    table.increments();
    table.string("name").notNullable();
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("project_positions");
}