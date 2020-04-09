exports.seed = function(knex) {
  return knex('bugs').del()
    .then(function () {
      return knex('bugs').insert([
        {
          bug: "Vision cannot tell what a banana is",
          poster_id: 6,
          project_id: 1,
          bug_status_id: 2,
          bug_priority_id: 1
        },
        {
          bug: "Maps api routing slightly off",
          poster_id: 14,
          project_id: 1,
          bug_status_id: 3,
          bug_priority_id: 3
        },
        {
          bug: "Speech-to-text api slightly racist",
          poster_id: 8,
          project_id: 1,
          bug_status_id: 1,
          bug_priority_id: 1
        },
        {
          bug: "Random memory leak",
          poster_id: 7,
          project_id: 2,
          bug_status_id: 2,
          bug_priority_id: 1
        },
        {
          bug: "Model requires tweaking and possible retraining",
          poster_id: 2,
          project_id: 3,
          bug_status_id: 2,
          bug_priority_id: 1
        },
        {
          bug: "Nothing worth watching comes with prime TV",
          poster_id: 18,
          project_id: 4,
          bug_status_id: 3,
          bug_priority_id: 3
        },
        {
          bug: "Video streams are too slow",
          poster_id: 22,
          project_id: 4,
          bug_status_id: 1,
          bug_priority_id: 1
        },
        {
          bug: "Not working on flip phones",
          poster_id: 29,
          project_id: 5,
          bug_status_id: 2,
          bug_priority_id: 2
        },
        {
          bug: "Wrong prices showing up",
          poster_id: 27,
          project_id: 5,
          bug_status_id: 1,
          bug_priority_id: 1
        },
        {
          bug: "Broken links",
          poster_id: 27,
          project_id: 6,
          bug_status_id: 2,
          bug_priority_id: 3
        },
        {
          bug: "user data vulnerability",
          poster_id: 34,
          project_id: 6,
          bug_status_id: 1,
          bug_priority_id: 1
        },
        {
          bug: "Pain receptors not functioning properly",
          poster_id: 38,
          project_id: 7,
          bug_status_id: 2,
          bug_priority_id: 1
        },
        {
          bug: "Blood/sweat spray program outputting too much",
          poster_id: 40,
          project_id: 7,
          bug_status_id: 1,
          bug_priority_id: 2
        },
        {
          bug: "Saftey measure periodically malfunctioning",
          poster_id: 42,
          project_id: 7,
          bug_status_id: 2,
          bug_priority_id: 1
        },
        {
          bug: "Video assests not working as intended",
          poster_id: 42,
          project_id: 8,
          bug_status_id: 1,
          bug_priority_id: 2
        },
        {
          bug: "Island network not fully setup",
          poster_id: 43,
          project_id: 8,
          bug_status_id: 2,
          bug_priority_id: 1
        },
        {
          bug: "Final boss is too strong and cannot be beat",
          poster_id: 50,
          project_id: 9,
          bug_status_id: 2,
          bug_priority_id: 1
        },
        {
          bug: "Dwight's face is all over the app",
          poster_id: 52,
          project_id: 10,
          bug_status_id: 1,
          bug_priority_id: 2
        },
      ]);
    });
};