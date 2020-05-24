exports.up = function(knex){
  return knex.schema.createTable("users_bugs", table => {
    table.increments();
    table.integer("users_id").references("id").inTable("users");
    table.integer("bugs_id").references("id").inTable("bugs");
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable("users_bugs");
}