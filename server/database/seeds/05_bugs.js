exports.seed = function(knex) {
  return knex('bugs').del()
    .then(function () {
      return knex('bugs').insert([
        {
          bug: "Not tracking bugs properly",
          poster_id: 5,
          project_id: 1,
          bug_status_id: 2,
          bug_priority_id: 1
        },
        {
          bug: "UI not functioning properly",
          poster_id: 4,
          project_id: 2,
          bug_status_id: 1,
          bug_priority_id: 3 
        },
        {
          bug: "Machine not learning",
          poster_id: 6,
          project_id: 3,
          bug_status_id: 3,
          bug_priority_id: 3 
        },
        {
          bug: "Website looks the same",
          poster_id: 10,
          project_id: 4,
          bug_status_id: 2,
          bug_priority_id: 3 
        },
        {
          bug: "Not available on flip phones",
          poster_id: 9,
          project_id: 5,
          bug_status_id: 3,
          bug_priority_id: 1 
        }
      ]);
    });
};
