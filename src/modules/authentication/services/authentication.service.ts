import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '@users/services/users.service';
import { ErrorManager } from '@utils/error.manager';
import { AuthenticationDTO } from '../dto/authentication.dto';
import { IAuthResponse } from '../models/authentication.interface';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly usersService: UsersService, // Inyecta UsersService
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

  private generateJwt(user: any) {
    return {
      token: this.jwtService.sign(
        { id: user.id, role: user.role },
        { secret: this.configService.get('JWT_SECRET') },
      ),
      user,
    };
  }
}
