import { FileUploadInterceptor } from './file.interceptor';

describe('FileInterceptor', () => {
  it('should be defined', () => {
    expect(new FileUploadInterceptor(['image/jpeg', 'image/png'])).toBeDefined();
  });
});
