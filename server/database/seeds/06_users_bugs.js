exports.seed = function(knex) {
  return knex("users_bugs")
    .del()
    .then(function (){
      return knex("users_bugs").insert([
        {
          users_id: 37,
          bugs_id: 12
        },
        {
          users_id: 38,
          bugs_id: 12
        },
        {
          users_id: 39,
          bugs_id: 12
        },
        {
          users_id: 4,
          bugs_id: 13
        },
        {
          users_id: 4,
          bugs_id: 12
        },
        {
          users_id: 40,
          bugs_id: 14
        },
        {
          users_id: 4,
          bugs_id: 14
        },
        {
          users_id: 42,
          bugs_id: 14
        },
        {
          users_id: 36,
          bugs_id: 14
        },
        {
          users_id: 41,
          bugs_id: 14
        },
        {
          users_id: 43,
          bugs_id: 14
        },
        {
          users_id: 45,
          bugs_id: 14
        },
        {
          users_id: 4,
          bugs_id: 15
        },
        {
          users_id: 44,
          bugs_id: 16
        },
        {
          users_id: 4,
          bugs_id: 16
        },
        {
          users_id: 4,
          bugs_id: 17
        },
        {
          users_id: 4,
          bugs_id: 18
        }
      ])
    }
  )
}