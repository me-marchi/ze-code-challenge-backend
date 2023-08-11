import { Router } from 'express';
import { PartnerController } from '../controllers/PartnerController';

const userRouter = Router();

userRouter
  .route('/')
  .post(PartnerController.create)
  .get(PartnerController.findClosest);

userRouter
  .route('/:partnerId')
  .get(PartnerController.findById);

export { userRouter };
