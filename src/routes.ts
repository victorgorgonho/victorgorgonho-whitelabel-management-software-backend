import express from 'express';
import multer from 'multer';

// Importing controllers
import usersController from './app/controllers/usersController';
import paymentsController from './app/controllers/paymentsController';
import filesController from './app/controllers/filesController';

// Importing configs
import multerConfig from './config/multer';

// Importing middlewares
import authMiddleware from './app/middlewares/auth';

// Importing database
import reportsController from './app/controllers/reportsController';

const routes = express.Router();

// Autenticação
routes.post('/users/authenticate', usersController.auth);
routes.post('/users/register', usersController.register);

// Arquivos
routes.post(
  '/files/',
  authMiddleware,
  multer(multerConfig).single('file'),
  filesController.store,
);
routes.get('/files/search', authMiddleware, filesController.find);
routes.get('/files/', authMiddleware, filesController.index);
routes.delete('/files/:id', authMiddleware, filesController.destroy);

routes.use(authMiddleware);

// Usuários
routes.get('/users', usersController.index);
routes.get('/users/search', usersController.filter);
routes.post('/users/confirm-payment/:id', usersController.confirmPayment);
routes.put('/users/:id', usersController.update);
routes.delete('/users/:id', usersController.destroy);

// Pagamentos
routes.post('/payments/', paymentsController.create);
routes.get('/payments', paymentsController.index);
routes.get('/payments/filter', paymentsController.filter);
routes.put('/payments/:id', paymentsController.update);
routes.delete('/payments/:id', paymentsController.destroy);

// Relatórios
routes.get('/reports', reportsController.index);

export default routes;
