import { Partner } from '../models/partner';

export interface FindByPartnerId {
  findById(userId: string): Promise<Partner>;
}
