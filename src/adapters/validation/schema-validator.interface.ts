export interface SchemaValidator {
    validate: (schemaName: string, DTO: any) => Error | void
}