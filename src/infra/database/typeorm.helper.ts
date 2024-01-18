import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { PartnerEntity } from '../entities/partner.entity';

export class TypeOrmHelper {

	static async connect(): Promise<DataSource> {
		try {
			const dataSource = new DataSource({
				type: 'postgres',
				host: process.env.POSTGRES_HOST,
				port: Number(process.env.DB_PORT),
				username: process.env.DB_USERNAME,
				password: process.env.DB_PASSWORD,
				database: process.env.DB_DATABASE,
				synchronize: true,
				logging: false,
				schema: process.env.DB_SCHEMA,
				entities: [PartnerEntity]
			});
			
			if (!dataSource.isInitialized) {
				await dataSource.initialize().catch((error) => {
					throw new Error(error);
				});
			} 
			
			return dataSource;

		} catch (error: any) {
			throw new Error('Not found connection, please try again');
		}
	}
}
