exports.up = function(knex){
  return knex.schema.createTable("comments", table => {
    table.increments();
    table.string("comment").notNullable();
    table.integer("poster_id").references("id").inTable("users");
    table.string("bug_id").references("id").inTable("bugs");
    table.timestamp("created_at").defaultTo(knex.fn.now());
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable("comments");
}