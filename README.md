# Bug Tracker
A bug/issue logger made with React, Javascript.

## Usage Instruction
Visit: [bugtrack.app](bugtrack.app) 

## Key Features
* Graph overview
* Real-time updates and Activity Feed (using [getstream.io](getstream.io))

## Reflection
This was a little side project I wanted to make after finishing Devleague's Web Developer bootcamp course. Project goals included using technologies learned up to this point and to utilize React-hooks along with a number of other new technologies. 

I originally wanted to make my own version of a planner that I could use while pursuing other projects of mine. I started this by using `create-react-app` boilerplate, then adding `react-router`, and making use of `react-hooks`.

One of the biggest challenges during development was authentication. This lead me taking a div into OAuth, and a handful of other third-party authentication software. Due to the overabundance of information and lack of time, I opted to go for a basic authentication setup I made with `passport.js` and `jwt-tokens`. It ended up working out, and I was able to put my full focus on to the rest of the application.

In the end, the technologies I used on the front-end are React, react-router, react-hooks, and Semantic-UI-react for the UI, and Node.js, postgreSQL, and bookshelf acting as a ORM. `create-react-app` along with hooks makes the code very easy to setup and get going without getting lost in weird technological rabbit holes. Bookshelf along with knex.js and node make it very easy to setup migrations and seed data aswell, further speeding up development. 
