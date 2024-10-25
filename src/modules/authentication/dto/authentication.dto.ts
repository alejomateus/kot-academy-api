import { PASSWORD_REGEX } from '@core/constants';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';
import { IAuthentication } from '../models/authentication.interface';


export class AuthenticationDTO implements IAuthentication {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Matches(PASSWORD_REGEX.CASE_B)
  password: string;
}
