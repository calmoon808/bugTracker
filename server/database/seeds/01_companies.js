exports.seed = function(knex) {
  return knex("companies")
    .del()
    .then(function (){
      return knex("companies").insert([
        {
          name: "n/a"
        },
        {
          name: "Google"
        },
        {
          name: "Amazon"
        },
        {
          name: "Walmart"
        },
        {
          name: "UFC"
        },
        {
          name: "Dunder Mifflin"
        }
      ])
    }
  )
}