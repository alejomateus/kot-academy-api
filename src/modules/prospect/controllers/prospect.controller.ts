import { PaginationDTO } from '@dto/pagination.dto';
import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProspectDTO } from '../dto/prospect.dto';
import { IProspect } from '../models/prospect.interface';
import { ProspectService } from '../services/prospect.service';

@Controller('prospects')
@ApiTags('Prospects')

export class ProspectController {
  constructor(private readonly prospectService: ProspectService) {}
  @Post()
  create(@Body() body: ProspectDTO): Promise<IProspect> {
    return this.prospectService.create(body);
  }

  @Get()
  findAll(@Query() queryParams: PaginationDTO): Promise<IProspect[]> {
    return this.prospectService.findAll(queryParams);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<IProspect> {
    return this.prospectService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.prospectService.delete(id);
  }
}
