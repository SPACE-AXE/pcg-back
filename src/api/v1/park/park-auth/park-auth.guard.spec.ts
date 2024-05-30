import { ParkAuthGuard } from './park-auth.guard';

describe('ParkAuthGuard', () => {
  it('should be defined', () => {
    expect(new ParkAuthGuard()).toBeDefined();
  });
});
