import { Test, TestingModule } from '@nestjs/testing';
import { MapController } from './map.controller';
import { ParkModule } from '../park/park.module';
import { ParkService } from '../park/park.service';

describe('MapController', () => {
  let controller: MapController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ParkModule],
      providers: [ParkService],
      controllers: [MapController],
    }).compile();

    controller = module.get<MapController>(MapController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('', () => {
    expect(controller.findByLocation).toBeDefined();
  });
});
