import {
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength
} from '@nestjs/class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CommonDBAttributes } from '@types-enum/common-attributes.type';
import { IProspect } from '../models/prospect.interface';

export class ProspectDTO implements Omit<IProspect, CommonDBAttributes> {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  @MinLength(3)
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  phone: string;
}

export class ProspectUpdateDTO extends PartialType(ProspectDTO) {}
