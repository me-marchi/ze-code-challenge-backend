import { PartnerRepository } from '../../../../infra/repositories/partner.repository';
import { FindByPartnerId } from '../../../../application/interfaces/useCases/find-by-partner-id.interface';
import { FindByPartnerIdUseCase } from '../../../../application/useCases/partner/find-by-partner-id.usecase';

export function findByPartnerIdFactory(): FindByPartnerId {
  const userRepository = new PartnerRepository();

  return new FindByPartnerIdUseCase(userRepository);
}
