const express = require('express');

const routes = express.Router();

const authMiddlewares = require('./middlewares/auth');
const guestMiddlewares = require('./middlewares/guest');

const authController = require('./controllers/authController');
const dashboardController = require('./controllers/dashboardController');
const projectController = require('./controllers/projectController');

routes.use((req, res, next) => {
  res.locals.flashSuccess = req.flash('success');
  res.locals.flashError = req.flash('error');
  next();
});

/**
 * Auth
 */
routes.get('/', guestMiddlewares, authController.sigin);
routes.get('/sigup', guestMiddlewares, authController.sigup);
routes.get('/sigout', authController.sigout);
routes.post('/register', authController.register);
routes.post('/authenticate', authController.authenticate);

/**
 * Dashboard
 */
routes.use('/app', authMiddlewares);
routes.get('/app/dashboard', dashboardController.index);

/**
 * Project
 */
routes.get('/app/projects/:id', projectController.show);
routes.post('/app/projects/create', projectController.store);

routes.use((req, res) => res.render('errors/404'));

routes.use((err, req, res, _next) => {
  res.status(err.status || 500);

  return res.render('errors/index', {
    message: err.message,
    error: process.env.NODE_ENV === 'production' ? {} : err,
  });
});

module.exports = routes;
