import { IPartnerRepository } from '../../../domain/data/partnerRepository.protocols';
import { Partner } from '../../../domain/models/partner';
import { CreatePartnerDTO } from '../../../domain/useCases/createPartner.protocols';
import { PartnerServiceError } from '../PartnerServiceError';

export class CreatePartnerUseCase {
  constructor(
    private readonly userRepository: Pick<IPartnerRepository, 'create'>
  ) {}

  async create(userDTO: CreatePartnerDTO): Promise<Partner> {
    const createdPartner = await this.userRepository
      .create({ ...userDTO })
      .catch(() => {
        throw new Error(PartnerServiceError.NOT_CREATED);
      });

    return createdPartner;
  }
}
