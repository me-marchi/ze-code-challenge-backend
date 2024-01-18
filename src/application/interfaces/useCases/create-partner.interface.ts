import { Partner } from '../../../domain/models/partner';

export interface ICreatePartnerUseCase {
  execute(dto: CreatePartnerDTO): Promise<Partner>;
}

export type CreatePartnerDTO = Partial<
  Omit<Partner, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>
>;

