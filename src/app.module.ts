import { AuthenticationModule } from '@authentication/authentication.module';
import { AuthMiddleware } from '@authentication/middlewares/auth.middleware';
import { CoreModule } from '@core/core.module';
import { HttpModule } from '@nestjs/axios';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersController } from '@users/controllers/users.controller';
import { UsersModule } from '@users/users.module';
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
    CoreModule,
    AuthenticationModule,
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(UsersController);
  }
}
