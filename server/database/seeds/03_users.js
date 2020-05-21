const bcrypt = require("bcryptjs");
let password = bcrypt.hashSync("password", 12);

exports.seed = function(knex) {
  return knex("users")
    .del()
    .then(function (){
      return knex("users").insert([{
        "email": "vilou@gmail.com",
        "password": password,
        "first_name": "Vialli",
        "last_name": "Ou",
        "company_position_id": 2
      }, {
        "email": "garwong.com",
        "password": password,
        "first_name": "Gary",
        "last_name": "Wong",
        "company_position_id": 2
      }, {
        "email": "kaucolburn.com",
        "password": password,
        "first_name": "Kau",
        "last_name": "Colburn",
        "company_position_id": 2
      }, {
        "email": "demo@gmail.com",
        "password": password,
        "first_name": "Demo",
        "last_name": "Man",
        "company_position_id": 2
      }, {
        "email": "shaphan@gmail.com",
        "password": password,
        "first_name": "Shane",
        "last_name": "Phan",
        "company_position_id": 2
      }, {
        "email": "kconichie0@addtoany.com",
        "password": password,
        "first_name": "Koenraad",
        "last_name": "Conichie",
        "company_position_id": 3
      }, {
        "email": "aleake1@webs.com",
        "password": password,
        "first_name": "Augusto",
        "last_name": "Leake",
        "company_position_id": 3 
      }, {
        "email": "coluby2@imdb.com",
        "password": password,
        "first_name": "Corinne",
        "last_name": "O'Luby",
        "company_position_id": 4 
      }, {
        "email": "lpoacher3@desdev.cn",
        "password": password,
        "first_name": "Leontyne",
        "last_name": "Poacher",
        "company_position_id": 4 
      }, {
        "email": "egarner4@godaddy.com",
        "password": password,
        "first_name": "Evvie",
        "last_name": "Garner",
        "company_position_id": 4 
      }, {
        "email": "jrodda5@drupal.org",
        "password": password,
        "first_name": "Jere",
        "last_name": "Rodda",
        "company_position_id": 4 
      }, {
        "email": "rappleby6@economist.com",
        "password": password,
        "first_name": "Rogerio",
        "last_name": "Appleby",
        "company_position_id": 4 
      }, {
        "email": "smarrian7@mlb.com",
        "password": password,
        "first_name": "Scot",
        "last_name": "Marrian",
        "company_position_id": 4 
      }, {
        "email": "kjorioz8@un.org",
        "password": password,
        "first_name": "Keeley",
        "last_name": "Jorioz",
        "company_position_id": 4 
      }, {
        "email": "tprantl9@lycos.com",
        "password": password,
        "first_name": "Tyson",
        "last_name": "Prantl",
        "company_position_id": 5 
      }, {
        "email": "jhaacka@webnode.com",
        "password": password,
        "first_name": "Jeri",
        "last_name": "Haack",
        "company_position_id":  2
      }, {
        "email": "ocoulsonb@bloglines.com",
        "password": password,
        "first_name": "Oby",
        "last_name": "Coulson",
        "company_position_id": 3
      }, {
        "email": "gfulmenc@nsw.gov.au",
        "password": password,
        "first_name": "Guglielma",
        "last_name": "Fulmen",
        "company_position_id": 4
      }, {
        "email": "fbragad@google.co.uk",
        "password": password,
        "first_name": "Fiann",
        "last_name": "Braga",
        "company_position_id": 4
      }, {
        "email": "svandecappellee@loc.gov",
        "password": password,
        "first_name": "Seth",
        "last_name": "Van De Cappelle",
        "company_position_id": 4
      }, {
        "email": "fdelucaf@webs.com",
        "password": password,
        "first_name": "Fitz",
        "last_name": "Deluca",
        "company_position_id": 4
      }, {
        "email": "rhanbyg@usatoday.com",
        "password": password,
        "first_name": "Rica",
        "last_name": "Hanby",
        "company_position_id": 4
      }, {
        "email": "cdowkerh@de.vu",
        "password": password,
        "first_name": "Clemmy",
        "last_name": "Dowker",
        "company_position_id": 4
      }, {
        "email": "fpollei@simplemachines.org",
        "password": password,
        "first_name": "Far",
        "last_name": "Polle",
        "company_position_id": 4
      }, {
        "email": "dschubuserj@engadget.com",
        "password": password,
        "first_name": "Dame",
        "last_name": "Schubuser",
        "company_position_id": 5
      }, {
        "email": "flandisk@umn.edu",
        "password": password,
        "first_name": "Fanni",
        "last_name": "Landis",
        "company_position_id": 3
      }, {
        "email": "ependlel@imdb.com",
        "password": password,
        "first_name": "Elton",
        "last_name": "Pendle",
        "company_position_id": 3
      }, {
        "email": "lferrilliom@cpanel.net",
        "password": password,
        "first_name": "Lizzy",
        "last_name": "Ferrillio",
        "company_position_id": 4
      }, {
        "email": "dhandsn@naver.com",
        "password": password,
        "first_name": "Diann",
        "last_name": "Hands",
        "company_position_id": 4
      }, {
        "email": "laskwitho@blogtalkradio.com",
        "password": password,
        "first_name": "Lana",
        "last_name": "Askwith",
        "company_position_id": 4
      }, {
        "email": "pkolakovicp@state.tx.us",
        "password": password,
        "first_name": "Peggie",
        "last_name": "Kolakovic",
        "company_position_id": 4
      }, {
        "email": "svillaretq@pen.io",
        "password": password,
        "first_name": "Sal",
        "last_name": "Villaret",
        "company_position_id": 4
      }, {
        "email": "gkillr@csmonitor.com",
        "password": password,
        "first_name": "Giovanna",
        "last_name": "Kill",
        "company_position_id": 4
      }, {
        "email": "ddominellis@adobe.com",
        "password": password,
        "first_name": "Devora",
        "last_name": "Dominelli",
        "company_position_id": 4
      }, {
        "email": "ppizeyt@scientificamerican.com",
        "password": password,
        "first_name": "Pet",
        "last_name": "Pizey",
        "company_position_id": 5
      }, {
        "email": "ogolbyu@twitpic.com",
        "password": password,
        "first_name": "Oneida",
        "last_name": "Golby",
        "company_position_id": 3
      }, {
        "email": "dbethamv@netlog.com",
        "password": password,
        "first_name": "Dalli",
        "last_name": "Betham",
        "company_position_id": 3
      }, {
        "email": "csafferw@yolasite.com",
        "password": password,
        "first_name": "Cal",
        "last_name": "Saffer",
        "company_position_id": 4
      }, {
        "email": "jtowerx@techcrunch.com",
        "password": password,
        "first_name": "Jamesy",
        "last_name": "Tower",
        "company_position_id": 4
      }, {
        "email": "mraithmilly@wordpress.org",
        "password": password,
        "first_name": "Milly",
        "last_name": "Raithmill",
        "company_position_id": 4
      }, {
        "email": "jgravesonz@ucsd.edu",
        "password": password,
        "first_name": "Joete",
        "last_name": "Graveson",
        "company_position_id": 4
      }, {
        "email": "knitti10@google.pl",
        "password": password,
        "first_name": "Keslie",
        "last_name": "Nitti",
        "company_position_id": 4
      }, {
        "email": "filyin11@bbc.co.uk",
        "password": password,
        "first_name": "Fletcher",
        "last_name": "Ilyin",
        "company_position_id": 4
      }, {
        "email": "fphebee12@php.net",
        "password": password,
        "first_name": "Frieda",
        "last_name": "Phebee",
        "company_position_id": 4
      }, {
        "email": "hchantillon13@webmd.com",
        "password": password,
        "first_name": "Hetty",
        "last_name": "Chantillon",
        "company_position_id": 5
      }, {
        "email": "glegan14@mashable.com",
        "password": password,
        "first_name": "Gloriane",
        "last_name": "Legan",
        "company_position_id": 3
      }, {
        "email": "anielson15@jalbum.net",
        "password": password,
        "first_name": "Amii",
        "last_name": "Nielson",
        "company_position_id": 3
      }, {
        "email": "cmcgarvie16@noaa.gov",
        "password": password,
        "first_name": "Cyb",
        "last_name": "McGarvie",
        "company_position_id": 4
      }, {
        "email": "horsay17@oracle.com",
        "password": password,
        "first_name": "Husein",
        "last_name": "Orsay",
        "company_position_id": 4
      }, {
        "email": "msaunders18@nsw.gov.au",
        "password": password,
        "first_name": "Michelina",
        "last_name": "Saunders",
        "company_position_id": 4
      }, {
        "email": "elangmuir19@gravatar.com",
        "password": password,
        "first_name": "Eada",
        "last_name": "Langmuir",
        "company_position_id": 4
      }, {
        "email": "psowerby1a@loc.gov",
        "password": password,
        "first_name": "Peggy",
        "last_name": "Sowerby",
        "company_position_id": 4
      }, {
        "email": "bscad1b@umich.edu",
        "password": password,
        "first_name": "Berkeley",
        "last_name": "Scad",
        "company_position_id": 4
      }, {
        "email": "mwildman1c@utexas.edu",
        "password": password,
        "first_name": "Marc",
        "last_name": "Wildman",
        "company_position_id": 4
      }, {
        "email": "edrummond1d@google.com.hk",
        "password": password,
        "first_name": "Ericha",
        "last_name": "Drummond",
        "company_position_id": 5
      }])
    })
}