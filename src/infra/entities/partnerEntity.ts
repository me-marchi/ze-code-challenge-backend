import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Partner, CoverageArea, Address } from '../../domain/models/partner';

@Entity({ name: 'partners' })
export class PartnerEntity implements Partner {
    @PrimaryGeneratedColumn()
	id: number;

    @Column({ name: 'trading_name' })
    tradingName: string;

    @Column({ name: 'owner_name' })
    ownerName: string;

    @Column({ name: 'document' })
    document: string;

    @Column('jsonb', { name: 'coverage_area' })
    coverageArea: CoverageArea;

    @Column('jsonb', { name: 'address' })
    address: Address;
}
