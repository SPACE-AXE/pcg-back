import { Test, TestingModule } from '@nestjs/testing';
import { ParkingTransactionService } from './parking-transaction.service';

describe('ParkingTransactionService', () => {
  let service: ParkingTransactionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParkingTransactionService],
    }).compile();

    service = module.get<ParkingTransactionService>(ParkingTransactionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
