import {
  Injectable,
  NestMiddleware
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ErrorManager } from '@utils/error.manager';

@Injectable()
export class ApplicationMiddleware implements NestMiddleware {
  constructor(private readonly configService: ConfigService) {}

  use(req: any, res: any, next: () => void) {
    try {
      if (req.headers['APP_KEY'] !== this.configService.get('APP_KEY')) {
        throw new ErrorManager({
          type: 'UNAUTHORIZED',
          message: 'Invalid Key',
        });
      }
      next();
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
