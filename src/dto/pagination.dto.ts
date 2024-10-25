import { IsUUID } from '@nestjs/class-validator';
import { IsNumber, IsOptional, Max, Min } from 'class-validator';

export class PaginationDTO {
  @IsNumber()
  @Min(1)
  page: number;

  @IsUUID()
  @Min(10)
  @Max(100)
  @IsOptional()
  lastVisibleId?: string;
}
