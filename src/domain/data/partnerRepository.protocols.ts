import { Partner } from '../models/partner';

export interface IPartnerRepository {
  create(partnerDTO: Partial<Partner>): Promise<Partner>;
  findAll(): Promise<Partner[]>;
  findById(partnerId: string): Promise<Partner | null>;
}
