import {
  Body,
  Controller,
  Post
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthenticationDTO } from '../dto/authentication.dto';
import { IAuthResponse } from '../models/authentication.interface';
import { AuthenticationService } from '../services/authentication.service';

@Controller('authentication')
@ApiTags('Authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('sign-in')
  async userSignIn(@Body() body: AuthenticationDTO): Promise<IAuthResponse> {
    return await this.authenticationService.signIn(body);
  }
}
