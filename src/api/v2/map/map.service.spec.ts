import { Test, TestingModule } from '@nestjs/testing';
import { MapService } from './map.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

jest.setTimeout(60000);

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
        lat: 36.112765,
        lng: 128.406284,
        price: 5000,
        space: 10000,
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

  it('placeToLatLng', async () => {
    expect(await service.placeToLatLng('대구역')).toBeDefined();
  });
});
