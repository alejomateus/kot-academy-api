import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PaginationDTO } from '@src/dto/pagination.dto';
import { UserDTO } from '../dto/user.dto';
import { IUser } from '../models/user.interface';
import { UsersService } from '../services/users.service';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() body: UserDTO): Promise<IUser> {
    return this.usersService.create(body);
  }

  @Get()
  findAll(@Query() queryParams: PaginationDTO): Promise<IUser[]> {
    return this.usersService.findAll(queryParams);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<IUser> {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  async partialUpdate(
    @Param('id') id: string,
    @Body() userData: Partial<UserDTO>,
  ): Promise<IUser> {
   return  this.usersService.update(id, userData);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.delete(id);
  }
}
