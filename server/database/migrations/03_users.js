exports.up = function(knex) {
  return knex.schema.createTable("users", table => {
    table.increments();
    table.string("email").notNullable().unique();
    table.string("password").notNullable();
    table.string("first_name");
    table.string("last_name");
    table.integer("project_position_id").references("id").inTable("project_positions");
    table.integer("company_id").references("id").inTable("companies");
    table.integer("assigned_to").references("id").inTable("projects");
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable("users");
}