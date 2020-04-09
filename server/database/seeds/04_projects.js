exports.seed = function(knex) {
  return knex('projects')
    .del()
    .then(function () {
      return knex('projects').insert([
        {
          name: "Cloud Services",
          description: "Need better implementation of cloud features",
          project_creator_id: 1,
          company_id: 1
        },
        {
          name: "Better, faster search algorithm",
          description: "Bing is starting to catch up and we really need some improvements",
          project_creator_id: 6,
          company_id: 1
        },
        {
          name: "Neural Network",
          description: "Model requires tweaking and possible retraining",
          project_creator_id: 2,
          company_id: 2
        },
        {
          name: "Amazon Prime TV",
          description: "Slight bug where nothing worth watching comes with basic prime tv",
          project_creator_id: 16,
          company_id: 2
        },
        {
          name: "New Phone App",
          description: "Walmart needs to be on mobile",
          project_creator_id: 3,
          company_id: 3
        },
        {
          name: "Broken links",
          description: "Certain links on company site lead no where",
          project_creator_id: 26,
          company_id: 3
        },
        {
          name: "VR UFC",
          description: "Base prototype no where near completion",
          project_creator_id: 4,
          company_id: 4
        },
        {
          name: "Pain receptors",
          description: "No actual pain is felt when punched in VR",
          project_creator_id: 36,
          company_id: 4
        },
        {
          name: "GPS routing for delivery service too slow",
          description: "Will need an entire redo",
          project_creator_id: 5,
          company_id: 5
        },
        {
          name: "Phone app not responding",
          description: "Entire server crash",
          project_creator_id: 46,
          company_id: 5
        }
      ]);
    });
};
