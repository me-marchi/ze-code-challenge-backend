import { Partner } from '../../../domain/models/partner';

export interface FindNearestPartner {
  findNearest(userLocation: number[]): Promise<Partner>;
}
