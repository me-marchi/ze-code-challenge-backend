import { Router } from 'express';
import { PartnerController } from '../../presentation/controllers/partner.controller';

const userRouter = Router();

userRouter.route('/partner/').post(PartnerController.create);

userRouter.route('/partner/nearest').get(PartnerController.findNearest);

userRouter.route('/partner/:partnerId').get(PartnerController.findById);

export { userRouter };
