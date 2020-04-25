exports.up = function(knex) {
  return knex.schema.createTable("project_statuses", table => {
    table.increments();
    table.string("status");
  })  
};

exports.down = function(knex) {
  return knex.schema.dropTable("project_statuses")
};