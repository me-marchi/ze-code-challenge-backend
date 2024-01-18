import { Partner } from '../../../domain/models/partner';

export interface FindByPartnerId {
  findById(userId: string): Promise<Partner>;
}
