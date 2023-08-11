import { PartnerRepository } from '../../../infra/repositories/partnerRepository';
import { FindByPartnerId } from '../../../domain/useCases/findByPartnerId.protocols';
import { FindByPartnerIdUseCase } from './FindByPartnerIdUseCase';

export function findByPartnerIdFactory(): FindByPartnerId {
  const userRepository = new PartnerRepository();

  return new FindByPartnerIdUseCase(userRepository);
}
