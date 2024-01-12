# Solo Queue Analytics


Solo Queue Analytics is a web app that allows users to search up their League of Legends profie and view various statistics on their solo queue ranked performance. The tool displays information about the last 20 ranked games and calculates the averages based on that.

This project is broken down into two subfolders. The front-end can be found in the `client/` folder, and the back-end can be found in `server/`.



## Client


The front-end of this project was created using Vue 3 bundled by Vite. To run this front-end on your local machine head into the `client/` directory. 


- Type `npm i` to install all dependencies for this project.

- Type `npm run dev` to start a local development server on port `5173`.

- Type `npm run build` to create a production build. This will be placed in the `dist/` directory.

- Type `npm run preview` to preview your production build.

- Type `npm run lint` to run the ES linter.

- Type `npm run format` to run prettier formatter.



## Server


The back-end server was created using Node.js and Express.js. To run this back-end on your local machine head into the `server/` directory. 


- Type `npm i` to install all dependencies for this project.

- Type `npm run dev` to run the server in dev mode. This utilizes `nodemon` for automatically restarting on code changes.

- Type `npm run start` to start the server.


The server requires two environment variables to function.


1. `RIOT_KEY` - This is your Riot Games API key which can be obtained from the [Riot Developer Portal](https://developer.riotgames.com/apis).

2. `DATABASE_URL` - This is your connection string to your database. In our case we are using [PlanetScale MySQL](https://planetscale.com/).