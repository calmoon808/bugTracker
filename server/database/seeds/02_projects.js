exports.seed = function(knex) {
  return knex('projects')
    .del()
    .then(function () {
      return knex('projects').insert([
        {
          name: "Bugtracker",
          company_id: 4
        },
        {
          name: "New UI",
          company_id: 2
        },
        {
          name: "Neural Network",
          company_id: 1
        },
        {
          name: "Website Redo",
          company_id: 5
        },
        {
          name: "New Phone App",
          company_id: 3
        }
      ]);
    });
};
