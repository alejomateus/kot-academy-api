import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AnswersService } from '../services/answers.service';

@Controller('answers')
@ApiTags('Answers')
export class AnswersController {
  constructor(private readonly answersService: AnswersService) {}
  @Post('create')
  create(@Body() body: any): Promise<any> {
    return this.answersService.create(body);
  }

  @Get()
  findAll(@Query() queryParams: any): Promise<any[]> {
    return this.answersService.findAll(queryParams);
  }
}
