import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FirebaseModule } from 'nestjs-firebase';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    FirebaseModule.forRoot({
      googleApplicationCredential: "./firebase.json",
      storageBucket: 'gs://kot-academy.appspot.com'
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
