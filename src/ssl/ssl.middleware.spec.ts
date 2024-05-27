import { SslMiddleware } from './ssl.middleware';

describe('SslMiddleware', () => {
  it('should be defined', () => {
    expect(new SslMiddleware()).toBeDefined();
  });
});
