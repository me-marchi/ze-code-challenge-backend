import { IPartnerRepository } from '../../interfaces/repositories/partner-repository.interface';
import { Partner } from '../../../domain/models/partner';
import { PartnerServiceError } from './partner.service-error';
import { point, multiPolygon } from '@turf/helpers';
import booleanPointInPolygon from '@turf/boolean-point-in-polygon';
import distance from '@turf/distance';

export class FindNearestPartnerUseCase {
  constructor(
    private readonly userRepository: Pick<IPartnerRepository, 'findAll'>
  ) {}

  async findNearest(userLocation: number[]): Promise<Partner> {
    const foundPartners = await this.userRepository.findAll().catch(() => {
      throw new Error(PartnerServiceError.NOT_FOUND);
    });

    if (!foundPartners) throw new Error(PartnerServiceError.NOT_FOUND);

    const userPoint = point(userLocation);
    const partnersDistance = [] as number[];

    const partnersInArea = foundPartners.filter((partner) => {
      const partnerMultiPolygon = multiPolygon(
        partner.coverageArea.coordinates
      );
      const isPointInArea = booleanPointInPolygon(
        userPoint,
        partnerMultiPolygon
      );

      if (isPointInArea) {
        const partnerAdress = partner.address.coordinates;
        const partnerDistance = distance(userPoint, partnerAdress);
        partnersDistance.push(partnerDistance);
        return true;
      } else return false;
    });

    if (!partnersInArea) throw new Error(PartnerServiceError.NOT_FOUND);

    const nearestPartnerIndex = partnersDistance.reduce((accumulator, current, index, array) => {
        return current < array[accumulator] ? index : accumulator;
      }
    );

    return partnersInArea[nearestPartnerIndex];
  }
}
