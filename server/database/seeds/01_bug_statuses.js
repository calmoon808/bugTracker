
exports.seed = function(knex) {
  return knex('bug_statuses').del()
    .then(function () {
      return knex('bug_statuses').insert([
        {
          status: "Unassigned",
        },
        {
          status: "Assigned",
        },
        {
          status: "Fixed",
        }
      ]);
    });
};
