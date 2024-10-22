import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadInterceptor } from '../interceptors/file/file.interceptor';

export function FileTypes(types: string[]) {
    return applyDecorators(
      UseInterceptors(
        FileInterceptor('file'), 
        new FileUploadInterceptor(types), 
      ),
    );
  }