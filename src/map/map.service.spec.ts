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

  it('', async () => {
    expect(await service.getPublicPark(128.406284, 36.112765)).toBeDefined();
  });
});
