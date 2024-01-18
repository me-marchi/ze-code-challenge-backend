import { SchemaValidator } from '../../adapters/validation/schema-validator.interface';
import { joiSchemas } from './joi-validator-schemas';

export class JoiSchemaValidatorAdapter implements SchemaValidator {

	validate(schemaName: string, DTO: any): Error | void {

		const schema = joiSchemas[schemaName]
		const dtoValidation = schema.validate(DTO);
		
		if (dtoValidation.error) {
			const schemaAttributes = schema.$_terms.keys.map((objectKey: any) => objectKey.key);
				const attributeErrorFromValidator = dtoValidation.error.details[0].context?.key;

				const attributeError = schemaAttributes.find((attribute: string) => attribute === attributeErrorFromValidator)
				if (attributeError) throw new Error(`Invalid attribute: '${attributeError}'`)
		}
	}

}