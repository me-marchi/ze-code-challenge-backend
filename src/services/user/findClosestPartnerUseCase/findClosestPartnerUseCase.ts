import { IPartnerRepository } from '../../../domain/data/partnerRepository.protocols';
import { Partner } from '../../../domain/models/partner';
import { point, multiPolygon } from '@turf/helpers';
import booleanPointInPolygon from '@turf/boolean-point-in-polygon';
import distance from '@turf/distance';

export class FindClosestPartnerUseCase {
	constructor(
		private readonly userRepository: Pick<IPartnerRepository, 'findAll'>
	) {}

	async findClosest(userLocation: number[]): Promise<Partner> {
		const foundPartners = await this.userRepository
			.findAll()
			.catch(() => {
				throw new Error('No users found');
			});

		const userPoint = point(userLocation);
		const partnersDistance = [] as number[];

		const partnersInArea = foundPartners.filter((partner) => {
			const partnerMultiPolygon = multiPolygon(partner.coverageArea.coordinates);
			const isPointInArea = booleanPointInPolygon(userPoint, partnerMultiPolygon);

			if (isPointInArea) {
				const partnerAdress = partner.address.coordinates;
				const partnerDistance = distance(userPoint, partnerAdress);
				partnersDistance.push(partnerDistance);
				return true;
			}
			else return false;
		});

		const closestPartnerIndex = partnersDistance.reduce((accumulator, current, index, array) => {
			return current < array[accumulator] ? index : accumulator;
		});

		return partnersInArea[closestPartnerIndex];
	}
}
