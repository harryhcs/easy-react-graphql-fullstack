# easy-react-graphql-fullstack
A very simple implementation of React side-by-side with Express and GraphQL. I have also added react-router-dom to make it clear that only certain paths actually get data from the server, but they are still seved on the same port and running as one application.

## Installing
After cloning the project, cd into it and install all the required node packages:
```
yarn install
```

## Setting up your environmental variables
The app is setup to use postgresql, this can be changed by updating the config file in **api/config/database.dev.js** (knex config). You will need to create a
**.env** file with the following content in it:
```
EASY_ENV=dev // this will determine if your working with dev or prod
DB_HOST=somedatabase.somehost.com
DB_PORT=5432
DB_USER=myusername
DB_PASSWORD=myseupersecretpassword
DB_DATABASE=mydatabasename
```
## Running the application
Once all the packages have installed succesfuly and you have setup your .env file simply start the project:
```
yarn start
```

## Some things to keep in mind
- Make sure the **_port number_** in server.js matches the **_proxy address and port_** in package.json. Its running on port 3001 by default.