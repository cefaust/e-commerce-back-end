const express = require('express');
const mysql2 = require('mysql2');
const routes = require('./routes');
const sequelize = require('./config/connection');
//Please input username and password in .env file before starting server

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database, then turn on the server
sequelize.sync({force: false}).then(() =>{
app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
});
