import { PartnerRepository } from '../../../../infra/repositories/partner.repository';
import { ICreatePartnerUseCase } from '../../../../application/interfaces/useCases/create-partner.interface';
import { CreatePartnerUseCase } from '../../../../application/useCases/partner/create-partner.usecase';
import { JoiSchemaValidatorAdapter } from '../../../../infra/validator/joi-validator.adapter';

export function createPartnerFactory(): ICreatePartnerUseCase {
  const partnerRepository = new PartnerRepository();
  const schemaValidator = new JoiSchemaValidatorAdapter()

  return new CreatePartnerUseCase(partnerRepository, schemaValidator);
}
