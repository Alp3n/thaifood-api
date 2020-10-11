const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const itemsRoutes = require('./api/routes/items');
const ordersRoutes = require('./api/routes/orders');
const usersRoutes = require('./api/routes/users');

mongoose.connect(
  'mongodb+srv://alp3n:' +
    process.env.MONGO_ATLAS_PW +
    '@thai.bo392.gcp.mongodb.net/Thai?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  }
);

app.use(morgan('dev'));
app.use('assets/photos/', express.static('assets/photos/'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((res, req, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    '*'
    // 'Origin, X-Requestedd-With, Content-Type, Accept, Authorization'
  );
  if (req.method === 'OPTIONS') {
    res.headers(
      'Accecss-Control-Allow-Methods',
      '*'
      // 'PUT, POST, PATCH, DELETE, GET'
    );
    return res.status(200).json({});
  }
  next();
});

// Routes to handle requests
app.use('/items', itemsRoutes);
app.use('/orders', ordersRoutes);
app.use('/users', usersRoutes);

app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  {
    res.status(error.status || 500);
    res.json({
      error: {
        message: error.message,
        status: error.status,
      },
    });
  }
});

module.exports = app;
