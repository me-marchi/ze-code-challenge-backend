import { TypeOrmHelper } from '../typeORMHelper';
import { PartnerEntity } from '../../entities/partnerEntity';
import * as fs from 'fs';
import path from 'path';
import { config } from 'dotenv';
config();

const jsonData = fs.readFileSync(path.join(__dirname, 'pdvs.json'), 'utf8');
const data = JSON.parse(jsonData);

async function seedDatabase() {
    try {
        for (const item of data.pdvs) {
            const connection = await TypeOrmHelper.connect();
            await connection.getRepository(PartnerEntity).save(item).catch((error) => {
                throw new Error('Error seeding data: ' + error);
            });
        }
        console.log('Data seeding completed');
    } catch (error) {
        throw new Error('Error seeding data: ' + error);
    }
}

seedDatabase();
