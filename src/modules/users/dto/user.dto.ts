import { PASSWORD_REGEX } from '@core/constants';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from '@nestjs/class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CommonDBAttributes } from '@types-enum/common-attributes.type';
import { RoleEnum } from '@types-enum/role.enum';
import { IUser } from '../models/user.interface';

export class UserDTO implements Omit<IUser, CommonDBAttributes> {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  @MinLength(3)
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  @MinLength(3)
  lastName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Matches(PASSWORD_REGEX.CASE_B)
  password?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  phone: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsEnum(RoleEnum)
  role?: RoleEnum;
}

export class UserUpdateDTO extends PartialType(UserDTO) {}
