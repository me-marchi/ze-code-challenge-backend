import { Partner } from '../models/partner';

export interface FindClosestPartner {
  findClosest(userLocation: number[]): Promise<Partner>;
}
