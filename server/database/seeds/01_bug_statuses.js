
exports.seed = function(knex) {
  return knex('bug_statuses').del()
    .then(function () {
      return knex('bug_statuses').insert([
        {
          status: "Fixed",
        },
        {
          status: "Assigned",
        },
        {
          status: "Unassigned",
        }
      ]);
    });
};
