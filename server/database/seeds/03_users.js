exports.seed = function(knex) {
  return knex("users")
    .del()
    .then(function (){
      return knex("users").insert([
        {
          "email": "ablandamore0@google.cn",
          "first_name": "Aile",
          "last_name": "Blandamore",
          "project_position_id": 5,
          "company_id": 1
        }, 
        {
          "email": "dolivia1@eepurl.com",
          "first_name": "Daryle",
          "last_name": "Olivia",
          "project_position_id": 4,
          "company_id": 5
        }, 
        {
          "email": "mfackney2@theglobeandmail.com",
          "first_name": "Maurine",
          "last_name": "Fackney",
          "project_position_id": 2,
          "company_id": 2
        }, 
        {
          "email": "jlorence3@zimbio.com",
          "first_name": "Janos",
          "last_name": "Lorence",
          "project_position_id": 1,
          "company_id": 2
        }, 
        {
          "email": "lalecock4@xinhuanet.com",
          "first_name": "Lew",
          "last_name": "Alecock",
          "project_position_id": 1,
          "company_id": 4
        }, {

          "email": "jclementet5@com.com",
          "first_name": "Jerome",
          "last_name": "Clementet",
          "project_position_id": 2,
          "company_id": 1
        }, 
        {
          "email": "lbelitz6@ft.com",
          "first_name": "Lyon",
          "last_name": "Belitz",
          "project_position_id": 5,
          "company_id": 2
        }, 
        {
          "email": "sdiggins7@seattletimes.com",
          "first_name": "Simonette",
          "last_name": "Diggins", 
          "project_position_id": 4,
          "company_id": 3
        }, 
        {
          "email": "jpeltz8@discuz.net",
          "first_name": "Jason",
          "last_name": "Peltz",
          "project_position_id": 3,
          "company_id": 3
        }, 
        {
          "email": "cbussons9@webmd.com",
          "first_name": "Cyb",
          "last_name": "Bussons",
          "project_position_id": 2,
          "company_id": 5
        }
      ])
    })
}