# superheroes_olympics_app

The app is divided in:

· superheroes_olympics_server: NodeJS based backend side who implements the API to handle the super heroes CRUD with MongoDB and the logic to simulate the pentathlon.
. superheroes_olympics_client: Vue 3 based frontend-side to explode the API, with the graphical interface to deal with the CRUD and pentathlon simulator given by the server.

Steps to deploy the application:

1. MongoDB installed. The port and host in which mongo is running and the target odatabase, will be defined in server-side configuration: ("\superheroes_olympics_app\superheroes_olympics_server\config\server.cnf"). Used MongoDB community edition -> https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-windows/

2. NodeJS installed. Used LTS for WindowsOS -> https://nodejs.org/en/download

3. Install dependencies for both server and client:
   -> \superheroes_olympics_server> npm i
   -> \superheroes_olympics_client> npm i

4. Start NodeJS server and run Vue 3 frontend client:
