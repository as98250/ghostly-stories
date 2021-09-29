const express = require('express');

const session = require('express-session');
const routes = require('./controllers');

const mysql = require('mysql2');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const exphbs = require('express-handlebars');

app.set('view engine', 'handlebars');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});

