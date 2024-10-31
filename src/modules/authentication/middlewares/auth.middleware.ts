import {
  Injectable,
  NestMiddleware
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IUser } from '@users/models/user.interface';
import { UsersService } from '@users/services/users.service'; // Ruta correcta
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { ErrorManager } from '../../../utils/error.manager';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers['authorization']?.split(' ')[1];

      if (!token) {
        throw new ErrorManager({
          type: 'UNAUTHORIZED',
          message: 'Token is required',
        });
      }

      const decoded: any = jwt.verify(
        token,
        this.configService.get('JWT_SECRET'),
      );
      const user: IUser = await this.usersService.findOne(decoded.id);
      req.user = user;

      if (user.role !== 'admin') {
        throw new ErrorManager({
          type: 'UNAUTHORIZED',
          message: 'You do not have permission to access this resource',
        });
      }

      next();
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
