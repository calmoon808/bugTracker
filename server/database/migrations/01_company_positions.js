exports.up = function(knex) {
  return knex.schema.createTable("company_positions", table => {
    table.increments();
    table.string("name").notNullable();
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable("company_positions");
}