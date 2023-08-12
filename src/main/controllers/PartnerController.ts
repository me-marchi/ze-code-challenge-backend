import { Request, Response } from 'express';
import { createPartnerFactory } from '../../services/user/createPartnerUseCase/createPartnerFactory';
import { findNearestPartnerFactory } from '../../services/user/findNearestPartnerUseCase/findNearestPartnerFactory';
import { findByPartnerIdFactory } from '../../services/user/findByPartnerIdUseCase/findByPartnerIdFactory';

export class PartnerController {
  static async create(request: Request, response: Response): Promise<Response> {
    try {
      const partner = request.body;
      delete partner.id,
        partner.createdAt,
        partner.updatedAt,
        partner.deletedAt;

      const useCase = createPartnerFactory();
      const createdPartner = await useCase.create(partner).catch((error) => {
        throw new Error(error);
      });

      return response.status(200).send(createdPartner);
    } catch (error: any) {
      return response.status(error.status).send(error);
    }
  }

  static async findNearest(
    request: Request,
    response: Response
  ): Promise<Response> {
    try {
      const { userLat, userLon } = request.query;

      const useCase = findNearestPartnerFactory();
      const foundPartners = await useCase
        .findNearest([Number(userLat), Number(userLon)])
        .catch((error: any) => {
          throw new Error(error);
        });

      return response.status(200).send(foundPartners);
    } catch (error: any) {
      return response.status(error.status).send(error);
    }
  }

  static async findById(
    request: Request,
    response: Response
  ): Promise<Response> {
    try {
      const { partnerId } = request.params;

      const useCase = findByPartnerIdFactory();
      const foundPartner = await useCase
        .findById(partnerId)
        .catch((error: any) => {
          throw new Error(error);
        });

      return response.status(200).send(foundPartner);
    } catch (error: any) {
      return response.status(error.status).send(error);
    }
  }
}
