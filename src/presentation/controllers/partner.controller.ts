import { Request, Response } from 'express';
import { createPartnerFactory } from '../../main/factories/useCases/partner/create-partner.factory';
import { findNearestPartnerFactory } from '../../main/factories/useCases/partner/find-nearest-partner.factory';
import { findByPartnerIdFactory } from '../../main/factories/useCases/partner/find-by-partner-id.factory';
import { StatusError } from '../errors/status-error';

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
        throw new StatusError(400, error);
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
          throw new StatusError(400, error);
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
          throw new StatusError(400, error);
        });

      return response.status(200).send(foundPartner);
    } catch (error: any) {
      return response.status(error.status).send(error);
    }
  }
}
