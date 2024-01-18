import { IPartnerRepository } from '../../interfaces/repositories/partner-repository.interface';
import { Partner } from '../../../domain/models/partner';
import { PartnerServiceError } from './partner.service-error';

export class FindByPartnerIdUseCase {
  constructor(
    private readonly userRepository: Pick<IPartnerRepository, 'findById'>
  ) {}

  async findById(userId: string): Promise<Partner> {
    const foundPartner = await this.userRepository
      .findById(userId)
      .catch(() => {
        throw new Error(PartnerServiceError.NOT_FOUND);
      });

    if (!foundPartner) {
      throw new Error(PartnerServiceError.NOT_FOUND);
    }

    return foundPartner;
  }
}
