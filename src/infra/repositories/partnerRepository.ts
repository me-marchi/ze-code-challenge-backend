import { Partner } from '../../domain/models/partner';
import { PartnerEntity } from '../entities/partnerEntity';
import { IPartnerRepository } from '../../domain/data/partnerRepository.protocols';
import { TypeOrmHelper } from '../database/typeORMHelper';

export class PartnerRepository implements IPartnerRepository {

  async create(partnerDTO: Partial<Partner>): Promise<Partner> {
    const connection = await TypeOrmHelper.connect();
    const result = await connection.getRepository(PartnerEntity).save(partnerDTO);
    return result;
  }

  async findAll(): Promise<Partner[]> {
    const connection = await TypeOrmHelper.connect();
    const result = await connection.getRepository(PartnerEntity).find();
    return result;
  }

  async findById(partnerId: string): Promise<Partner | null> {
    const connection = await TypeOrmHelper.connect();
    const result = await connection.getRepository(PartnerEntity).findOne({ where: { id: Number(partnerId) }});
    return result;
  }
}
