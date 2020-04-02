exports.seed = function(knex) {
  return knex('projects')
    .del()
    .then(function () {
      return knex('projects').insert([
        {
          name: "Bugtracker",
          project_creator_id: 5,
          company_id: 4
        },
        {
          name: "New UI",
          project_creator_id: 3,
          company_id: 2
        },
        {
          name: "Neural Network",
          project_creator_id: 1,
          company_id: 1
        },
        {
          name: "Website Redo",
          project_creator_id: 2,
          company_id: 5
        },
        {
          name: "New Phone App",
          project_creator_id: 8,
          company_id: 3
        }
      ]);
    });
};
