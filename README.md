# Solo Queue Analytics


[Solo Queue Analytics](https://solo-queue-analytics.netlify.app/) is a web app that allows users to search up their League of Legends profie and view various statistics on their solo queue ranked performance. The tool displays information about the last 20 ranked games and calculates the averages based on that.

This project is broken down into two subfolders. The front-end can be found in the `client/` folder, and the back-end can be found in `server/`.

Here are some example profiles for demoing the app:

- Region: North America, Riot Name: Pobelter, Tag: NA1. [Direct Link](https://solo-queue-analytics.netlify.app/summoner/NA1/Pobelter/NA1)
- Region: North America, Riot Name: Adrian Riven, Tag: NA1. [Direct Link](https://solo-queue-analytics.netlify.app/summoner/NA1/Adrian%20Riven/NA1)
- Region: North America, Riot Name: Voppo, Tag: NA1. [Direct Link](https://solo-queue-analytics.netlify.app/summoner/NA1/Voppo/NA1)


Warning: Due to the massive item changes in Season 14, Riot's API has not been updated to reflect the new item icons. As a result, the items displayed in the match history section might display as "S14" instead of an icon. This will hopefully be fixed soon.

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