import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { PartnerEntity } from '../../infra/entities/partnerEntity';

export const dataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: true,
    logging: true,
    entities: [PartnerEntity]
});

dataSource.initialize()
    .then(() => {
        console.log('Data Source has been initialized');
    })
    .catch((error) => console.log(error));
