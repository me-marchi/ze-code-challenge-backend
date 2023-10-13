import Joi from 'joi';

export function validateSchema<T>(
    schema: Joi.ObjectSchema<T>,
    DTO: T
): void | Error {

    const dtoValidation = schema.validate(DTO);
    const schemaAttributes = schema.$_terms.keys.map((objectKey: any) => objectKey.key);
    
    if (dtoValidation.error) {
        const attributeErrorFromValidator = dtoValidation.error.details[0].context?.key;

        for (const attributeError of schemaAttributes) {
            if (attributeError === attributeErrorFromValidator) {
                throw new Error(`Invalid attribute: '${attributeError}'`);
            }
        }
    }
}
