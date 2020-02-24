exports.up = function(knex) {
  return knex.schema.createTable("project_positions", table => {
    table.increments();
    table.string("name").notNullable();
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable("project_positions");
}