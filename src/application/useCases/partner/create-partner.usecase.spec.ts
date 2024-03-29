import { IPartnerRepository } from '../../interfaces/repositories/partner-repository.interface';
import { Partner } from '../../../domain/models/partner';
import { PartnerServiceError } from './partner.service-error';
import { CreatePartnerUseCase } from './create-partner.usecase';

const partnerDTO: Omit<Partner, 'id'> = {
    tradingName: 'Adega Osasco',
    ownerName: 'Ze da Ambev',
    document: '02.453.716/000170',
    coverageArea: {
        type: 'MultiPolygon',
        coordinates: [
            [
                [
                    [-43.36556, -22.99669],
                    [-43.36539, -23.01928],
                    [-43.26583, -23.01802],
                    [-43.25724, -23.00649],
                    [-43.23355, -23.00127],
                    [-43.2381, -22.99716],
                    [-43.23866, -22.99649],
                    [-43.24063, -22.99756],
                    [-43.24634, -22.99736],
                    [-43.24677, -22.99606],
                    [-43.24067, -22.99381],
                    [-43.24886, -22.99121],
                    [-43.25617, -22.99456],
                    [-43.25625, -22.99203],
                    [-43.25346, -22.99065],
                    [-43.29599, -22.98283],
                    [-43.3262, -22.96481],
                    [-43.33427, -22.96402],
                    [-43.33616, -22.96829],
                    [-43.342, -22.98157],
                    [-43.34817, -22.97967],
                    [-43.35142, -22.98062],
                    [-43.3573, -22.98084],
                    [-43.36522, -22.98032],
                    [-43.36696, -22.98422],
                    [-43.36717, -22.98855],
                    [-43.36636, -22.99351],
                    [-43.36556, -22.99669],
                ],
            ],
        ],
    },
    address: {
        type: 'Point',
        coordinates: [-43.297337, -23.013538]
    }
};

const createdPartner: Partner = {
    ...partnerDTO,
    id: 1
};

class PartnerRepositoryMock implements Pick<IPartnerRepository, 'create'> {
    async create(): Promise<Partner> {
        return Promise.resolve(createdPartner);
    }
//   async findAll(): Promise<Partner[]> {
//     return Promise.resolve([createdPartner]);
//   }
//   async findById(): Promise<Partner | null> {
//     return Promise.resolve(createdPartner);
//   }
}

const partnerRepositoryMock = new PartnerRepositoryMock();

function makeSutWithDependencies() {
    return new CreatePartnerUseCase(partnerRepositoryMock);
}

const sut = makeSutWithDependencies();

describe('CreatePartnerUseCase', () => {
    it('should call function to create partner', async () => {
        const partnerSpy = jest.spyOn(partnerRepositoryMock, 'create');
        await sut.create(partnerDTO);
        expect(partnerSpy).toBeCalledWith(partnerDTO);
    });

    it('should throw error if tradingName is not sent in the right format', async () => {
        const dto = { ...partnerDTO, tradingName: null as any };
        expect(sut.create(dto)).rejects.toThrowError('Atributo \'tradingName\' inválido');
    });



    it('should throw error if partner is not created', async () => {
        jest.spyOn(partnerRepositoryMock, 'create').mockReturnValueOnce(Promise.reject(new Error()));
        await expect(sut.create(partnerDTO)).rejects.toThrowError(PartnerServiceError.NOT_CREATED);
    });

    it('should return partner if it is created', async () => {
        const partner = await sut.create(partnerDTO);
        expect(partner).toMatchObject(createdPartner);
    });
});
