exports.up = function(knex){
  return knex.schema.createTable("projects", table => {
    table.increments();
    table.string("name").notNullable();
    table.integer("project_creator_id").references("id").inTable("users");
    table.integer("company_id").references("id").inTable("companies");
    table.integer("project_status_id").references("id").inTable("project_statuses")
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.datetime('due_date');
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable("projects");
}