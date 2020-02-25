exports.up = function(knex) {
  return knex.schema.createTable("bugs", table => {
    table.increments();
    table.string("bug");
    table.integer("poster_id").references("id").inTable("users").notNullable();
    table.integer("project_id").references("id").inTable("projects").notNullable();
    table.integer("bug_status_id").references("id").inTable("bug_statuses").notNullable();
    table.integer("bug_priority_id").references("id").inTable("bug_priorities").notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("bugs");
};