import { validateSchema } from '../../../infra/validator/validate-schema';
import { IPartnerRepository } from '../../interfaces/repositories/partner-repository.interface';
import { Partner } from '../../../domain/models/partner';
import { CreatePartnerDTO, ICreatePartnerUseCase } from '../../interfaces/useCases/create-partner.interface';
import { PartnerServiceError } from './partner.service-error';
import { SchemaValidator } from '../../../adapters/validation/schema-validator.interface';

import Joi from 'joi';

export class CreatePartnerUseCase implements ICreatePartnerUseCase {
    constructor(
        private readonly userRepository: Pick<IPartnerRepository, 'create'>,
        private readonly schemaValidator: SchemaValidator
    ) {}

    async execute(userDTO: CreatePartnerDTO): Promise<Partner> {

        this.schemaValidator.validate('createPartner', userDTO)

        const createdPartner = await this.userRepository.create({ ...userDTO }).catch(() => {
            throw new Error(PartnerServiceError.NOT_CREATED);
        });

        return createdPartner;
    }

}
