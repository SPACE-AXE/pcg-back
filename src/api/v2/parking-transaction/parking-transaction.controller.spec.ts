import { Test, TestingModule } from '@nestjs/testing';
import { ParkingTransactionController } from './parking-transaction.controller';
import { ParkingTransactionService } from './parking-transaction.service';

describe('ParkingTransactionController', () => {
  let controller: ParkingTransactionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParkingTransactionController],
      providers: [ParkingTransactionService],
    }).compile();

    controller = module.get<ParkingTransactionController>(
      ParkingTransactionController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
