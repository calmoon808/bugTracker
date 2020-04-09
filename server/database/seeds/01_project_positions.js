exports.seed = function(knex) {
  return knex("project_positions")
    .del()
    .then(function (){
      return knex("project_positions").insert([
        {
          name: "Technical Lead"
        },
        {
          name: "Project Manager"
        },
        {
          name: "Developer"
        },
        {
          name: "Tester"
        }
      ])
    }
  )
}