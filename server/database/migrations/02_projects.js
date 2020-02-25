exports.up = function(knex){
  return knex.schema.createTable("projects", table => {
    table.increments();
    table.string("name").notNullable();
    table.integer("company_id").references("id").inTable("companies");
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable("projects");
}