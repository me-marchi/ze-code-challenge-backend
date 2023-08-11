import { PartnerRepository } from '../../../infra/repositories/partnerRepository';
import { CreatePartner } from '../../../domain/useCases/createPartner.protocols';
import { CreatePartnerUseCase } from './CreatePartnerUseCase';

export function createPartnerFactory(): CreatePartner {
  const userRepository = new PartnerRepository();

  return new CreatePartnerUseCase(userRepository);
}
