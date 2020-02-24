exports.seed = function(knex) {
  return knex("project_positions")
    .del()
    .then(function (){
      return knex("project_positions").insert([
        {
          name: "Project Manager"
        },
        {
          name: "Developer"
        },
        {
          name: "Technical Lead"
        },
        {
          name: "Tester"
        },
        {
          name: "Client"
        }
      ])
    }
  )
}