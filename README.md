# superheroes_olympics_app

The app is divided in:

· superheroes_olympics_server: NodeJS based backend side who implements the API to handle the super heroes CRUD with MongoDB and the logic to simulate the pentathlon. It runs in port 3000 in localhost.
. superheroes_olympics_client: Vue 3 based frontend-side to explode the API, with the graphical interface to deal with the CRUD and pentathlon simulator given by the server.

Steps to deploy the application:

1. MongoDB installed. The port and host in which mongo is running and the target odatabase, will be defined in server-side configuration: ("\superheroes_olympics_app\superheroes_olympics_server\config\server.cnf"). Used MongoDB community edition -> https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-windows/

2. NodeJS installed. Used LTS for WindowsOS -> https://nodejs.org/en/download

3. Install dependencies for both server and client:
   -> \superheroes_olympics_server> npm i
   -> \superheroes_olympics_client> npm i

4. After dependency installation, start NodeJS server and run Vue 3 frontend client:
   -> For DEV mode: \superheroes_olympics_server> npm run dev (Target port by default is 8080)
   For PRODUCTION mode: \superheroes_olympics_server> npm run start
   -> For DEV mode: \superheroes_olympics_client> npm run serve
   For PRODUCTION mode, first build (\superheroes_olympics_client> npx vue-cli-service build) and then launch server, first installing serve dep (npm install -g serve) \superheroes_olympics_client> serve -s dist -l <TARGET_PORT>

The client will be accesible in http:\\localhost:<TARGET_PORT> Then, enjoy the SuperHeroes olympics app!!
