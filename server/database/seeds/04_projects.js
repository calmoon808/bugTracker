exports.seed = function(knex) {
  return knex('projects')
    .del()
    .then(function () {
      return knex('projects').insert([
        {
          name: "Cloud Services",
          project_creator_id: 1,
          company_id: 1,
          project_status_id: 1,
          due_date: "2021-04-01"
        },
        {
          name: "Better, faster search algorithm",
          project_creator_id: 6,
          company_id: 1,
          project_status_id: 1,
          due_date: "2020-09-15"
        },
        {
          name: "Neural Network",
          project_creator_id: 2,
          company_id: 2,
          project_status_id: 1,
        },
        {
          name: "Amazon Prime TV",
          project_creator_id: 16,
          company_id: 2,
          project_status_id: 1,
          due_date: "2020-09-01"
        },
        {
          name: "New Phone App",
          project_creator_id: 3,
          company_id: 3,
          project_status_id: 1,
          due_date: "2021-01-30"
        },
        {
          name: "Walmart Webiste",
          project_creator_id: 26,
          company_id: 3,
          project_status_id: 1,
          due_date: "2020-11-15"
        },
        {
          name: "VR UFC",
          project_creator_id: 4,
          company_id: 4,
          project_status_id: 1,
        },
        {
          name: "Coronavirus Private Island Stream",
          project_creator_id: 36,
          company_id: 4,
          project_status_id: 1,
          due_date: "2021-03-01"
        },
        {
          name: "Agent Scarn the video game",
          project_creator_id: 5,
          company_id: 5,
          project_status_id: 1,
          due_date: "2021-02-21"
        },
        {
          name: "Phone app",
          project_creator_id: 46,
          company_id: 5,
          project_status_id: 1,
        }
      ]);
    });
};
