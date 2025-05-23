// src/core/core.module.ts
import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';

@Module({
  imports:[UsersModule],
})
export class CoreModule {}
