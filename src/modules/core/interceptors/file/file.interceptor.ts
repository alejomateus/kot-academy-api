import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from '@nestjs/common';
import { ErrorManager } from '@utils/error.manager';
import { Observable } from 'rxjs';

@Injectable()
export class FileUploadInterceptor implements NestInterceptor {
  constructor(private allowedTypes: string[]) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    if (!request.file) {
      throw new ErrorManager({
        type: 'NOT_FOUND',
        message: 'Se requiere un archivo.',
      });
    }

    if (!this.allowedTypes.includes(request.file.mimetype)) {
      throw new ErrorManager({
        type: 'NOT_FOUND',
        message: 'Tipo de archivo no permitido.',
      });
    }

    return next.handle();
  }
}
