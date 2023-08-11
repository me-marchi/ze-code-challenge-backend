import { PartnerRepository } from '../../../infra/repositories/partnerRepository';
import { FindClosestPartner } from '../../../domain/useCases/findClosestPartner.protocols';
import { FindClosestPartnerUseCase } from './findClosestPartnerUseCase';

export function findClosestPartnerFactory(): FindClosestPartner {
  const partnerRepository = new PartnerRepository();

  return new FindClosestPartnerUseCase(partnerRepository);
}
