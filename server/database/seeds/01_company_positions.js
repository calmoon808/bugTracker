exports.seed = function(knex) {
  return knex("company_positions")
    .del()
    .then(function (){
      return knex("company_positions").insert([
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