import { FileTypes } from '@core/decorators/file.decorators';
import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
@UsePipes(new ValidationPipe({ transform: true }))

export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(): Promise<any> {
    return await this.appService.getHello();
  }
  @Post('upload')
  @FileTypes(['image/jpeg', 'image/png']) // Puedes agregar más tipos aquí
  async create(
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log(file);
    
    return this.appService.uploadFile(file);
  }
}
