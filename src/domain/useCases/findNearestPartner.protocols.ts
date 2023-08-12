import { Partner } from '../models/partner';

export interface FindNearestPartner {
  findNearest(userLocation: number[]): Promise<Partner>;
}
