exports.up = function(knex) {
  return knex.schema.createTable("users", table => {
    table.increments();
    table.string("email").notNullable().unique();
    table.string("password").notNullable();
    table.string("first_name");
    table.string("last_name");
    table.integer("company_position_id").references("id").inTable("company_positions");
    table.integer("company_id").references("id").inTable("companies");
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable("users");
}