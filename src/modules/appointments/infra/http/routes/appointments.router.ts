import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import esureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import AppointmentsController from '../controllers/AppointmentsController';
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController';

const appointmentsRouter = Router();

const appointmentsController = new AppointmentsController();
const providerAppointmentsController = new ProviderAppointmentsController();

appointmentsRouter.use(esureAuthenticated);

appointmentsRouter.post(
  '/',
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required(),
    },
  }),
  appointmentsController.create,
);
appointmentsRouter.get(
  '/me',
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required(),
    },
  }),
  providerAppointmentsController.index,
);

export default appointmentsRouter;
