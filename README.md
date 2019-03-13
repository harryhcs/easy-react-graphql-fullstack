# easy-react-graphql-fullstack
A very simple implementation of React side-by-side with Express and GraphQL. I have also added react-router-dom to make it clear that only certain paths actually get data from the server, but they are still seved on the same port and running as one application.

## Installing
After cloning the project, cd into it and install all the required node packages:
```
npm install
```

## Running the application
Once all the packages have installed succesfuly simply start the project:
```
npm start
```

## Some things to keep in mind
- Make sure the **_port number_** in server.js matches the **_proxy address and port_** in package.json

## Roadmap
- [ ] Add Sequelize