import { IPartnerRepository } from '../../../domain/data/partnerRepository.protocols';
import { Partner } from '../../../domain/models/partner';

export class FindByPartnerIdUseCase {
  constructor(
    private readonly userRepository: Pick<IPartnerRepository, 'findById'>
  ) {}

  async findById(userId: string): Promise<Partner> {
    const foundPartner = await this.userRepository
      .findById(userId)
      .catch(() => {
        throw new Error('Partner not found');
      });

    if (!foundPartner) {
      throw new Error('Partner not found');
    }

    return foundPartner;
  }
}
