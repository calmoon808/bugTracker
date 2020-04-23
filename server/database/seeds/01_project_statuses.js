exports.seed = function(knex) {
  return knex('project_statuses').del()
    .then(function () {
      return knex('project_statuses').insert([
        {
          status: "In-Progress",
        },
        {
          status: "Closed",
        }
      ]);
    });
};
