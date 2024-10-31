import { ApplicationMiddleware } from './application.middleware';

describe('ApplicationMiddleware', () => {
  it('should be defined', () => {
    expect(new ApplicationMiddleware()).toBeDefined();
  });
});
