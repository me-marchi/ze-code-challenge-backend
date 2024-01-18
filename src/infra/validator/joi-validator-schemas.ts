import Joi from 'joi'

export const joiSchemas: Record<string, Joi.ObjectSchema> = {
    createPartner: Joi.object({
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
    })
}