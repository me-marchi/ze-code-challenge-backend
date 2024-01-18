import Joi from 'joi';
import { validateSchema } from './validate-schema';

const mockSchema = Joi.object({
    anyAttribute: Joi.string().required()
});

const mockDTO = {
    anyAttribute: 'any_string'
};

describe('validateSchema function', () => {
    it('should validate correct information from schema and mock and not throw error', () => {
        const sut = validateSchema(mockSchema, mockDTO);
        expect(sut).toBeUndefined;
    });

    it('should throw error if attribute does not exists', () => {
        const mockEmptyDTO = {};

        expect(() => {
            validateSchema(mockSchema, mockEmptyDTO);
        }).toThrowError(new Error('Atributo \'anyAttribute\' inválido'));
    });

});
