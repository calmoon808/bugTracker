exports.seed = function(knex) {
  return knex('projects')
    .del()
    .then(function () {
      return knex('projects').insert([
        {
          name: "Cloud Services",
          project_creator_id: 1,
          company_id: 1
        },
        {
          name: "Better, faster search algorithm",
          project_creator_id: 6,
          company_id: 1
        },
        {
          name: "Neural Network",
          project_creator_id: 2,
          company_id: 2
        },
        {
          name: "Amazon Prime TV",
          project_creator_id: 16,
          company_id: 2
        },
        {
          name: "New Phone App",
          project_creator_id: 3,
          company_id: 3
        },
        {
          name: "Walmart Webiste",
          project_creator_id: 26,
          company_id: 3
        },
        {
          name: "VR UFC",
          project_creator_id: 4,
          company_id: 4
        },
        {
          name: "Coronavirus Private Island Stream",
          project_creator_id: 36,
          company_id: 4
        },
        {
          name: "Agent Scarn the video game",
          project_creator_id: 5,
          company_id: 5
        },
        {
          name: "Phone app",
          project_creator_id: 46,
          company_id: 5
        }
      ]);
    });
};
