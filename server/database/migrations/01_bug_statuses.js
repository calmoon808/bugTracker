exports.up = function(knex) {
  return knex.schema.createTable("bug_statuses", table => {
    table.increments();
    table.string("status");
  })  
};

exports.down = function(knex) {
  return knex.schema.dropTable("bug_statuses")
};
