import { PartnerRepository } from '../../../infra/repositories/partnerRepository';
import { FindNearestPartner } from '../../../domain/useCases/findNearestPartner.protocols';
import { FindNearestPartnerUseCase } from './findNearestPartnerUseCase';

export function findNearestPartnerFactory(): FindNearestPartner {
  const partnerRepository = new PartnerRepository();

  return new FindNearestPartnerUseCase(partnerRepository);
}
