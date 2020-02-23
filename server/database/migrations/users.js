exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", table => {
    table.increments();
    table.string("email").notNullable().unique();
    table.string("first_name").notNullable();
    table.string("last_name").notNullable();
    table.integer("project_position_id").references("id").inTable("project_positions");
    table.integer("company_id").references("id").inTable("companies");
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("users");
}