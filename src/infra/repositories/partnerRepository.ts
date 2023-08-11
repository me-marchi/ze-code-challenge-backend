import { Partner } from '../../domain/models/partner';
import { PartnerEntity } from '../entities/partnerEntity';
import { IPartnerRepository } from '../../domain/data/partnerRepository.protocols';
import { dataSource } from '../database/dataSource';

export class PartnerRepository implements IPartnerRepository {

  async create(partnerDTO: Partial<Partner>): Promise<Partner> {
    const result = await dataSource.manager.save(PartnerEntity, partnerDTO);
    return result;
  }

  async findAll(): Promise<Partner[]> {
    const result = await dataSource.manager.find(PartnerEntity);
    return result;
  }

  async findById(partnerId: string): Promise<Partner | null> {
    const result = await dataSource.manager.findOne(PartnerEntity, { where: { id: Number(partnerId) }});
    return result;
  }
}
