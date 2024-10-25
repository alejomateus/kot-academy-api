import {
  ForbiddenException,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IUser } from '@users/models/user.interface';
import { UsersService } from '@users/services/users.service'; // Ruta correcta
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

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
        throw new UnauthorizedException('Token is required');
      }

      const decoded: any = jwt.verify(
        token,
        this.configService.get('JWT_SECRET'),
      );
      console.log(decoded);

      const user: IUser = await this.usersService.findOne(decoded.id);
      console.log(user);

      req.user = user;

      if (user.role !== 'admin') {
        throw new ForbiddenException(
          'You do not have permission to access this resource',
        );
      }

      next();
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
