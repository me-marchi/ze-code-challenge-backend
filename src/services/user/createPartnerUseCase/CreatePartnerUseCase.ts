import { validateSchema } from '../../helpers/validateSchema';
import { IPartnerRepository } from '../../../domain/data/partnerRepository.protocols';
import { Partner } from '../../../domain/models/partner';
import { CreatePartnerDTO } from '../../../domain/useCases/createPartner.protocols';
import { PartnerServiceError } from '../PartnerServiceError';
import Joi from 'joi';

export class CreatePartnerUseCase {
    constructor(
        private readonly userRepository: Pick<IPartnerRepository, 'create'>
    ) {}

    async create(userDTO: CreatePartnerDTO): Promise<Partner> {

        const partnerSchema = Joi.object({
            tradingName: Joi.string().required(),
            ownerName: Joi.string().required(),
            document: Joi.string().required(),
            coverageArea: Joi.object({
                type: Joi.string().required(),
                coordinates: Joi.array().required()
            }).required(),
            address: Joi.object({
                type: Joi.string().required(),
                coordinates: Joi.array().required()
            }).required()
        });

        validateSchema(partnerSchema, userDTO);

        const createdPartner = await this.userRepository.create({ ...userDTO }).catch(() => {
            throw new Error(PartnerServiceError.NOT_CREATED);
        });

        return createdPartner;
    }
}
