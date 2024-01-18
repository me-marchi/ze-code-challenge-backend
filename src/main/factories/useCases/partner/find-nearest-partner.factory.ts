import { PartnerRepository } from '../../../../infra/repositories/partner.repository';
import { FindNearestPartner } from '../../../../application/interfaces/useCases/find-nearest-partner.interface';
import { FindNearestPartnerUseCase } from '../../../../application/useCases/partner/find-nearest-partner.usecase';

export function findNearestPartnerFactory(): FindNearestPartner {
  const partnerRepository = new PartnerRepository();

  return new FindNearestPartnerUseCase(partnerRepository);
}
