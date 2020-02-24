exports.seed = function(knex) {
  return knex('bug_priorities').del()
    .then(function () {
      return knex('bug_priorities').insert([
        {
          priority: "Low",
        },
        {
          priority: "Medium",
        },
        {
          priority: "High",
        }
      ]);
    });
};
