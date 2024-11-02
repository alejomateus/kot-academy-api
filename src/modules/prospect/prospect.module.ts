import { Module } from '@nestjs/common';
import { ProspectController } from './controllers/prospect.controller';
import { ProspectService } from './services/prospect.service';

@Module({
  controllers: [ProspectController],
  providers: [ProspectService],
})
export class ProspectModule {}
