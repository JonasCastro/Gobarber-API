import { Router } from 'express';

import esureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import AppointmentsController from '../controllers/AppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();

appointmentsRouter.use(esureAuthenticated);

appointmentsRouter.post('/', appointmentsController.create);

export default appointmentsRouter;
