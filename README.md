# Getting Started with the task management app

## How to run the API server

- Create an instance of a PostgreSQL database. If you have Docker installed, you could spin up an ephemeral instance of a Postgres container like so:

  ```
  docker run --name postgresql -e POSTGRESQL_USER=guild -e POSTGRESQL_PASSWORD=guild -e POSTGRESQL_DATABASE=guild bitnami/postgresql:latest
  ```

- Navigate to `src/server` and perform an `npm install`
- Start the API server using `npm run start`. This will create the table structure using Sequelize, if the db schema doesn't exist yet. 

## How to run the React app

- Navigate to the `src/client` directory and perform an `npm install`. 
- Start the React app using `npm run start`. This should pop open a development version of the app in your browser under http://localhost:3002/
- From here, you should be able to create your first task. It should return you to the list of tasks (with your single one there). You add more, then click the column headers to sort the results. You can also type in a search term to filter the list down, or remove the term to return to the original results. 

https://user-images.githubusercontent.com/223784/221375393-62f6a142-10ec-4af8-a78e-50014a67950f.mp4

## Caveats
There are some obvious things that are missing, such as
- No user auth. On the API side, there's an easy way to add an auth middleware in `api.service.js` in the routes. 
- Some error handling is a bit wonky, but would be ironed out if I had more time. 
- React components could be better separated to keep it more DRY. At the moment the edit and add states use very similar forms. 
- Dockerize everything to make it easier to spin up. 
- Sorting has some wonkiness. It doesn't toggle sort directions when you click the headers a second time. Ironing out that logic would help. 
- There's no env config used. I hard coded values for my local PostgreSQL instance, but in a real world scenario these would be out of the repo. 