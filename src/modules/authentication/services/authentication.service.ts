import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { IUser } from '@users/models/user.interface';
import { UsersService } from '@users/services/users.service';
import { ErrorManager } from '@utils/error.manager';
import { AuthenticationDTO } from '../dto/authentication.dto';
import { IAuthResponse } from '../models/authentication.interface';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {}
  public async signIn(loginData: AuthenticationDTO): Promise<IAuthResponse> {
    try {
      const { email, password } = loginData;

      const user = await this.usersService.validateUser(email, password);
      console.log(user);

      return this.generateJwt(user);
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  private generateJwt(user: IUser): IAuthResponse {
    return {
      token: this.jwtService.sign(user, {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: '1h',
      }),
      user,
    };
  }

  private generateRefreshToken(user: IUser): string {
    return this.jwtService.sign(user, {
      secret: this.configService.get('REFRESH_TOKEN_SECRET'),
      expiresIn: '1h',
    });
  }

  public async refreshToken(refreshToken: string): Promise<IAuthResponse> {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get('REFRESH_TOKEN_SECRET'),
      });

      const user = await this.usersService.findOne(payload.userId); // Obtén el usuario desde la base de datos

      if (!user) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Invalid refresh token',
        });
      }

      const token = this.generateJwt(user);
      const newRefreshToken = this.generateRefreshToken(user);

      return { ...token, refreshToken: newRefreshToken };
    } catch (error) {
      throw new Error('Invalid refresh token');
    }
  }
}
