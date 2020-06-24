import { Router } from 'express';
import appointments from './appointments.router';

const routes = Router();
routes.use('/appointments', appointments);

export default routes;
