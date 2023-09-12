const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
// const helpers = require('./utils/helpers');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// const hbs = exphbs.create();
var hbs = engine.create({
  // extname: '.hbs',
  // defaultLayout: 'main',
  // layoutsDir: `${__dirname}/views/layouts`,
  // partialsDir: `${__dirname}/views/partials`,
  helpers: {
    formatTime: function (date, format) {
      return dayjs(date).format(format);
    },
    // compare: function (val1, val2) {
    //   return val1 === val2 ? true : false
    // },
    // runtimeOptions: {
    //   allowProtoPropertiesByDefault: true,
    //   allowProtoMethodsByDefault: true
    // }
  },
});

const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 60 * 60 * 1000,
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});