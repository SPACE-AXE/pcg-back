import { Test, TestingModule } from '@nestjs/testing';
import { MapService } from './map.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

describe('MapService', () => {
  let service: MapService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [MapService, ConfigService],
    }).compile();

    service = module.get<MapService>(MapService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('getPublicPark', async () => {
    expect(
      await service.getPublicPark({
        lat: 128.406284,
        lng: 36.112765,
        price: 100000,
        space: 10,
        disabled: 'Y',
      }),
    ).toBeDefined();
  });

  it('addrToLatLng', async () => {
    expect(
      await service.addrToLatLng('경상북도 구미시 광평동 50'),
    ).toBeDefined();
  });

  it('getParkInfo', async () => {
    expect(await service.getParkInfo('비산동사무소')).toBeDefined();
  });
});
