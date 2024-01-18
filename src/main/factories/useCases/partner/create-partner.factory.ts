import { PartnerRepository } from '../../../../infra/repositories/partner.repository';
import { CreatePartner } from '../../../../application/interfaces/useCases/create-partner.interface';
import { CreatePartnerUseCase } from '../../../../application/useCases/partner/create-partner.usecase';

export function createPartnerFactory(): CreatePartner {
  const userRepository = new PartnerRepository();

  return new CreatePartnerUseCase(userRepository);
}
