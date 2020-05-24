exports.up = function(knex) {
  return knex.schema.createTable("bug_priorities", table => {
    table.increments();
    table.string("priority");
  })  
};

exports.down = function(knex) {
  return knex.schema.dropTable("bug_priorities");
};
