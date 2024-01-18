import { Partner } from '../../../domain/models/partner';

export type CreatePartnerDTO = Partial<
  Omit<Partner, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>
>;

export interface CreatePartner {
  create(dto: CreatePartnerDTO): Promise<Partner>;
}
